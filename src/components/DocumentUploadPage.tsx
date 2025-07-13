import React, { useState, useRef } from 'react';
import { Upload, FileText, Link, Info, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useNavigate } from 'react-router-dom';

interface UploadedFile {
  file: File;
  name: string;
  size: string;
  type: string;
}

interface LastUploadRecord {
  fileName: string;
  uploadDate: string;
  documentType: string;
  status: 'Processing' | 'Completed' | 'Failed';
}

const DocumentUploadPage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [documentUrl, setDocumentUrl] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [documentSubType, setDocumentSubType] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [showSignedAlert, setShowSignedAlert] = useState(false);

  // Mock last upload record
  const lastUpload: LastUploadRecord = {
    fileName: 'ABC_Corp_Proposal_Q4.pdf',
    uploadDate: '2024-01-15 14:30',
    documentType: 'LOP - Signed',
    status: 'Completed'
  };

  const documentTypes = [
    { value: 'lop', label: 'Letter of Proposal (LOP)' },
    { value: 'cv', label: 'CV/Resume' },
    { value: 'contract', label: 'Contract' },
    { value: 'other', label: 'Other' }
  ];

  const lopSubTypes = [
    { value: 'draft', label: 'Draft' },
    { value: 'signed', label: 'Signed' }
  ];

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = (file: File) => {
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/png', 'image/jpeg'];
    
    if (!allowedTypes.includes(file.type)) {
      setValidationErrors(['Please upload a valid file type: PDF, DOCX, PNG, or JPG']);
      return;
    }

    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      setValidationErrors(['File size must be less than 50MB']);
      return;
    }

    setUploadedFile({
      file,
      name: file.name,
      size: formatFileSize(file.size),
      type: file.type.includes('pdf') ? 'PDF' : file.type.includes('word') ? 'DOCX' : 'Image'
    });
    setDocumentUrl(''); // Clear URL if file is uploaded
    validateForm();
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDocumentTypeChange = (value: string) => {
    setDocumentType(value);
    setDocumentSubType(''); // Reset sub-type when type changes
    setShowSignedAlert(false);
    validateForm();
  };

  const handleSubTypeChange = (value: string) => {
    setDocumentSubType(value);
    
    // Show alert if draft is selected when document might be signed
    if (value === 'signed' && uploadedFile?.name.toLowerCase().includes('draft')) {
      setShowSignedAlert(true);
    } else {
      setShowSignedAlert(false);
    }
    
    validateForm();
  };

  const validateForm = () => {
    const errors: string[] = [];
    
    if (!uploadedFile && !documentUrl) {
      errors.push('Please upload a document or provide a URL');
    }
    
    if (!documentType) {
      errors.push('Please select a document type');
    }
    
    if (documentType === 'lop' && !documentSubType) {
      errors.push('Please select a document sub-type for LOP');
    }
    
    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleClearAll = () => {
    setUploadedFile(null);
    setDocumentUrl('');
    setDocumentType('');
    setDocumentSubType('');
    setValidationErrors([]);
    setShowSignedAlert(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      // Navigate to review page with document data
      navigate('/review', { 
        state: { 
          document: uploadedFile || { url: documentUrl },
          type: documentType,
          subType: documentSubType 
        }
      });
    }
  };

  const isFormValid = uploadedFile && documentType && (documentType !== 'lop' || documentSubType);

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-semibold text-foreground">Document Processing</h1>
            <p className="text-muted-foreground">Upload and classify your business documents for automated processing</p>
          </div>

          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload or Import Your Document
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Drag & Drop Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  isDragging 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="space-y-4">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Drag and drop your document here</p>
                    <p className="text-sm text-muted-foreground">
                      Supports PDF, DOCX, PNG, JPG up to 50MB
                    </p>
                  </div>
                  <Button variant="outline" onClick={handleBrowseClick}>
                    Browse Files
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,.png,.jpg,.jpeg"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* URL Import */}
              <div className="space-y-2">
                <Label htmlFor="document-url" className="flex items-center gap-2">
                  <Link className="h-4 w-4" />
                  Or paste a public document URL
                </Label>
                <Input
                  id="document-url"
                  placeholder="https://example.com/document.pdf"
                  value={documentUrl}
                  onChange={(e) => {
                    setDocumentUrl(e.target.value);
                    if (e.target.value) setUploadedFile(null); // Clear file if URL is entered
                  }}
                />
              </div>

              {/* Third-party Import Options */}
              <div className="flex gap-2 flex-wrap">
                <Button variant="outline" size="sm" disabled>
                  Import from SharePoint
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Import from Box
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Import from OneDrive
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Classification Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Document Classification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Document Type */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  Document Type *
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Select the primary category of your document</p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Select value={documentType} onValueChange={handleDocumentTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select document type" />
                  </SelectTrigger>
                  <SelectContent>
                    {documentTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Document Sub-Type (for LOP) */}
              {documentType === 'lop' && (
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    Document Sub-Type *
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Only Signed LOPs will be sent to NetSuite after approval</p>
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Select value={documentSubType} onValueChange={handleSubTypeChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sub-type" />
                    </SelectTrigger>
                    <SelectContent>
                      {lopSubTypes.map((subType) => (
                        <SelectItem key={subType.value} value={subType.value}>
                          <div className="flex items-center gap-2">
                            {subType.value === 'signed' && (
                              <CheckCircle className="h-4 w-4 text-success" />
                            )}
                            {subType.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preview & Validation */}
          {(uploadedFile || documentUrl || validationErrors.length > 0 || showSignedAlert) && (
            <Card>
              <CardHeader>
                <CardTitle>Preview & Confirmation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* File Preview */}
                {uploadedFile && (
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <FileText className="h-8 w-8 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">{uploadedFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {uploadedFile.type} • {uploadedFile.size}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setUploadedFile(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {/* URL Preview */}
                {documentUrl && (
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <Link className="h-8 w-8 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">Document URL</p>
                      <p className="text-sm text-muted-foreground truncate">{documentUrl}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDocumentUrl('')}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {/* Classification Summary */}
                {documentType && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Classification:</p>
                    <div className="flex gap-2 flex-wrap">
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-sm">
                        {documentTypes.find(t => t.value === documentType)?.label}
                      </span>
                      {documentSubType && (
                        <span className={`px-2 py-1 rounded-md text-sm flex items-center gap-1 ${
                          documentSubType === 'signed' 
                            ? 'bg-success/10 text-success' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {documentSubType === 'signed' && <CheckCircle className="h-3 w-3" />}
                          {lopSubTypes.find(s => s.value === documentSubType)?.label}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Validation Errors */}
                {validationErrors.length > 0 && (
                  <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <ul className="list-disc list-inside space-y-1">
                        {validationErrors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}

                {/* Signed Document Alert */}
                {showSignedAlert && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      This document appears to be a draft but is marked as "Signed". Please verify the classification is correct.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <div className="space-x-2">
              <Button variant="outline" onClick={handleClearAll}>
                Clear All
              </Button>
              <Button variant="outline" disabled>
                Save Draft
              </Button>
            </div>
            
            <Button 
              onClick={handleNext}
              disabled={!isFormValid}
              className="min-w-[120px]"
            >
              Next →
            </Button>
          </div>

          {/* Last Upload Record */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <FileText className="h-8 w-8 text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-medium">{lastUpload.fileName}</p>
                  <p className="text-sm text-muted-foreground">
                    {lastUpload.uploadDate} • {lastUpload.documentType}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-md text-sm ${
                  lastUpload.status === 'Completed' 
                    ? 'bg-success/10 text-success'
                    : lastUpload.status === 'Processing'
                    ? 'bg-warning/10 text-warning'
                    : 'bg-destructive/10 text-destructive'
                }`}>
                  {lastUpload.status}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default DocumentUploadPage;