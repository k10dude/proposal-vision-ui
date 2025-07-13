import React, { useState } from 'react';
import { FileText, Check, X, RotateCcw, Upload, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ConfidenceSection } from './ConfidenceSection';
import { mockLOPData } from '../data/mockLOPData';

export const LOPReviewInterface: React.FC = () => {
  const [showPDF, setShowPDF] = useState(false);
  const [acceptedFields, setAcceptedFields] = useState<Set<string>>(new Set());
  const [editedValues, setEditedValues] = useState<Record<string, string>>({});

  const { highConfidence, mediumConfidence, lowConfidence } = mockLOPData;
  const totalFields = highConfidence.length + mediumConfidence.length + lowConfidence.length;
  const acceptedCount = acceptedFields.size;

  const handleAcceptField = (fieldId: string) => {
    const newAccepted = new Set(acceptedFields);
    if (newAccepted.has(fieldId)) {
      newAccepted.delete(fieldId);
    } else {
      newAccepted.add(fieldId);
    }
    setAcceptedFields(newAccepted);
  };

  const handleFieldEdit = (fieldId: string, value: string) => {
    setEditedValues(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const handleAcceptAll = () => {
    const allFieldIds = [
      ...highConfidence.map(f => f.id),
      ...mediumConfidence.map(f => f.id),
      ...lowConfidence.map(f => f.id)
    ];
    setAcceptedFields(new Set(allFieldIds));
  };

  const handleResetValues = () => {
    setAcceptedFields(new Set());
    setEditedValues({});
  };

  const allFieldsAccepted = acceptedCount === totalFields;

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-card border-b shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <FileText className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-2xl font-semibold text-foreground">LOP Data Review</h1>
                <p className="text-sm text-muted-foreground">
                  {acceptedCount} of {totalFields} fields reviewed
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPDF(!showPDF)}
                className="gap-2"
              >
                {showPDF ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                {showPDF ? 'Hide' : 'Show'} PDF
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleAcceptAll}
                className="gap-2"
              >
                <Check className="h-4 w-4" />
                Accept All
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetValues}
                className="gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Reset Values
              </Button>
              
              <Button
                className="gap-2"
                disabled={!allFieldsAccepted}
              >
                <Upload className="h-4 w-4" />
                Submit for Approval
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className={`grid ${showPDF ? 'grid-cols-2' : 'grid-cols-1'} gap-6 p-6`}>
          {/* Main Content */}
          <div className="space-y-6">
            <Accordion type="multiple" defaultValue={["low-confidence"]} className="space-y-4">
              {/* High Confidence Section */}
              <AccordionItem value="high-confidence" className="border border-confidence-high-border bg-confidence-high-bg rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-confidence-high text-confidence-high-foreground rounded-full">
                      <Check className="h-4 w-4" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-confidence-high">High Confidence</h3>
                      <p className="text-sm text-muted-foreground">≥90% confidence • {highConfidence.length} fields</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <ConfidenceSection
                    fields={highConfidence}
                    confidenceType="high"
                    acceptedFields={acceptedFields}
                    editedValues={editedValues}
                    onAcceptField={handleAcceptField}
                    onFieldEdit={handleFieldEdit}
                  />
                </AccordionContent>
              </AccordionItem>

              {/* Medium Confidence Section */}
              <AccordionItem value="medium-confidence" className="border border-confidence-medium-border bg-confidence-medium-bg rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-confidence-medium text-confidence-medium-foreground rounded-full">
                      ⚠️
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-confidence-medium">Medium Confidence</h3>
                      <p className="text-sm text-muted-foreground">70-89% confidence • {mediumConfidence.length} fields</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <ConfidenceSection
                    fields={mediumConfidence}
                    confidenceType="medium"
                    acceptedFields={acceptedFields}
                    editedValues={editedValues}
                    onAcceptField={handleAcceptField}
                    onFieldEdit={handleFieldEdit}
                  />
                </AccordionContent>
              </AccordionItem>

              {/* Low Confidence Section */}
              <AccordionItem value="low-confidence" className="border border-confidence-low-border bg-confidence-low-bg rounded-lg">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 bg-confidence-low text-confidence-low-foreground rounded-full">
                      ❗
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-semibold text-confidence-low">Low Confidence</h3>
                      <p className="text-sm text-muted-foreground">&lt;70% confidence • {lowConfidence.length} fields</p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <ConfidenceSection
                    fields={lowConfidence}
                    confidenceType="low"
                    acceptedFields={acceptedFields}
                    editedValues={editedValues}
                    onAcceptField={handleAcceptField}
                    onFieldEdit={handleFieldEdit}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* PDF Viewer */}
          {showPDF && (
            <div className="bg-card border rounded-lg p-6">
              <div className="h-full flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">Original LOP Document</h3>
                  <p className="text-sm">PDF viewer would be integrated here</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};