import React from 'react';
import { Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { LOPField } from '../data/mockLOPData';

interface ConfidenceSectionProps {
  fields: LOPField[];
  confidenceType: 'high' | 'medium' | 'low';
  acceptedFields: Set<string>;
  editedValues: Record<string, string>;
  onAcceptField: (fieldId: string) => void;
  onFieldEdit: (fieldId: string, value: string) => void;
}

export const ConfidenceSection: React.FC<ConfidenceSectionProps> = ({
  fields,
  confidenceType,
  acceptedFields,
  editedValues,
  onAcceptField,
  onFieldEdit
}) => {
  // Group fields by category
  const groupedFields = fields.reduce((acc, field) => {
    if (!acc[field.category]) {
      acc[field.category] = [];
    }
    acc[field.category].push(field);
    return acc;
  }, {} as Record<string, LOPField[]>);

  const getConfidenceColor = () => {
    switch (confidenceType) {
      case 'high': return 'confidence-high';
      case 'medium': return 'confidence-medium';
      case 'low': return 'confidence-low';
      default: return 'muted';
    }
  };

  const FieldRow: React.FC<{ field: LOPField }> = ({ field }) => {
    const isAccepted = acceptedFields.has(field.id);
    const currentValue = editedValues[field.id] || field.value;
    const confidenceColor = getConfidenceColor();

    return (
      <div className="grid grid-cols-12 gap-4 items-center py-3 border-b border-border/50 last:border-b-0">
        {/* Field Label */}
        <div className="col-span-3">
          <label className="text-sm font-medium text-foreground">
            {field.label}
            {field.required && <span className="text-destructive ml-1">*</span>}
          </label>
        </div>

        {/* Editable Input */}
        <div className="col-span-5">
          <Input
            value={currentValue}
            onChange={(e) => onFieldEdit(field.id, e.target.value)}
            className="text-sm"
            placeholder="Enter value..."
          />
        </div>

        {/* Confidence Score */}
        <div className="col-span-2">
          <Badge 
            variant="secondary" 
            className={`bg-${confidenceColor}-bg text-${confidenceColor} border-${confidenceColor}-border`}
          >
            {field.confidence}%
          </Badge>
        </div>

        {/* Accept/Reject Actions */}
        <div className="col-span-2 flex gap-2">
          <Button
            size="sm"
            variant={isAccepted ? "default" : "outline"}
            onClick={() => onAcceptField(field.id)}
            className={`w-8 h-8 p-0 ${
              isAccepted 
                ? `bg-${confidenceColor} hover:bg-${confidenceColor}/90` 
                : ''
            }`}
          >
            {isAccepted ? (
              <Check className="h-4 w-4" />
            ) : (
              <Check className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={Object.keys(groupedFields)} className="space-y-4">
        {Object.entries(groupedFields).map(([category, categoryFields]) => (
          <AccordionItem key={category} value={category} className="border rounded-lg bg-card">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center justify-between w-full pr-4">
                <h4 className="text-base font-medium text-foreground">{category}</h4>
                <Badge variant="outline" className="text-xs">
                  {categoryFields.length} fields
                </Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <div className="space-y-1">
                {/* Header */}
                <div className="grid grid-cols-12 gap-4 items-center py-2 text-xs font-medium text-muted-foreground border-b">
                  <div className="col-span-3">Field</div>
                  <div className="col-span-5">Value</div>
                  <div className="col-span-2">Confidence</div>
                  <div className="col-span-2">Status</div>
                </div>
                
                {/* Field Rows */}
                {categoryFields.map((field) => (
                  <FieldRow key={field.id} field={field} />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};