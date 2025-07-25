export interface LOPField {
  id: string;
  label: string;
  value: string;
  confidence: number;
  category: string;
  required: boolean;
  netsuiteValue?: string; // Existing value in NetSuite
}

export interface ConfidenceGroups {
  highConfidence: LOPField[];
  mediumConfidence: LOPField[];
  lowConfidence: LOPField[];
}

export const mockLOPData: ConfidenceGroups = {
  highConfidence: [
    {
      id: 'company_name',
      label: 'Company name',
      value: 'Global Tech Solutions Inc.',
      confidence: 98,
      category: 'Company',
      required: true,
      netsuiteValue: 'Global Tech Solutions'
    },
    {
      id: 'quoted_fee',
      label: 'Quoted fee',
      value: '$185,000',
      confidence: 96,
      category: 'Invoice Instructions',
      required: true,
      netsuiteValue: '$180,000'
    },
    {
      id: 'quoted_currency',
      label: 'Quoted currency',
      value: 'USD',
      confidence: 99,
      category: 'Invoice Instructions',
      required: true,
      netsuiteValue: 'USD'
    },
    {
      id: 'contract_date',
      label: 'Contract date',
      value: '2024-02-15',
      confidence: 95,
      category: 'LoP',
      required: true,
      netsuiteValue: '2024-02-15'
    },
    {
      id: 'lop_signed_yn',
      label: 'Lop signed Y/N',
      value: 'Yes',
      confidence: 97,
      category: 'LoP',
      required: true,
      netsuiteValue: 'Yes'
    },
    {
      id: 'payment_terms',
      label: 'Payment terms',
      value: 'Net 30 days',
      confidence: 94,
      category: 'Invoice Instructions',
      required: true,
      netsuiteValue: 'Net 30'
    },
    {
      id: 'lead_consultant',
      label: 'Lead Consultant',
      value: 'Sarah Mitchell',
      confidence: 92,
      category: 'Execution',
      required: true,
      netsuiteValue: 'S. Mitchell'
    },
    {
      id: 'invoicing_method',
      label: 'Invoicing method',
      value: 'Monthly',
      confidence: 93,
      category: 'Invoice Instructions',
      required: true,
      netsuiteValue: 'Monthly'
    }
  ],
  mediumConfidence: [
    {
      id: 'vat_id',
      label: 'VAT ID',
      value: 'GB123456789',
      confidence: 87,
      category: 'Company',
      required: true,
      netsuiteValue: 'GB123456780'
    },
    {
      id: 'city',
      label: 'City',
      value: 'New York',
      confidence: 84,
      category: 'Company',
      required: true,
      netsuiteValue: 'New York'
    },
    {
      id: 'street',
      label: 'Street',
      value: '1234 Business Avenue',
      confidence: 82,
      category: 'Company',
      required: true,
      netsuiteValue: '1234 Business Ave'
    },
    {
      id: 'state',
      label: 'State',
      value: 'NY',
      confidence: 89,
      category: 'Company',
      required: true,
      netsuiteValue: 'NY'
    },
    {
      id: 'zip',
      label: 'Zip',
      value: '10001',
      confidence: 88,
      category: 'Company',
      required: true,
      netsuiteValue: '10001'
    },
    {
      id: 'number_of_instalments',
      label: 'Number of instalments',
      value: '3',
      confidence: 79,
      category: 'Invoice Instructions',
      required: false,
      netsuiteValue: '2'
    },
    {
      id: 'invoice_language',
      label: 'Invoice language',
      value: 'English',
      confidence: 85,
      category: 'Invoice Instructions',
      required: true,
      netsuiteValue: 'English'
    },
    {
      id: 'po_number_needed',
      label: 'PO number needed?',
      value: 'Yes',
      confidence: 76,
      category: 'Invoice Instructions',
      required: true,
      netsuiteValue: 'No'
    },
    {
      id: 'practice_group_1',
      label: 'Practice Group 1',
      value: 'Executive Search',
      confidence: 81,
      category: 'Coding',
      required: true,
      netsuiteValue: 'Exec Search'
    },
    {
      id: 'success_fee',
      label: 'Success fee',
      value: '$25,000',
      confidence: 78,
      category: 'Invoice Plan',
      required: false,
      netsuiteValue: '$20,000'
    }
  ],
  lowConfidence: [
    {
      id: 'additional_address_line',
      label: 'Additional address line',
      value: 'Suite 1200',
      confidence: 64,
      category: 'Company',
      required: false,
      netsuiteValue: ''
    },
    {
      id: 'country',
      label: 'Country',
      value: 'United States',
      confidence: 68,
      category: 'Company',
      required: true,
      netsuiteValue: 'USA'
    },
    {
      id: 'candidate',
      label: 'Candidate',
      value: 'John Anderson',
      confidence: 58,
      category: 'Expenses',
      required: false,
      netsuiteValue: ''
    },
    {
      id: 'consultant',
      label: 'Consultant',
      value: 'Michael Roberts',
      confidence: 62,
      category: 'Expenses',
      required: false,
      netsuiteValue: 'M. Roberts'
    },
    {
      id: 'fixed_expenses_percentage',
      label: 'Fixed expenses %',
      value: '15%',
      confidence: 55,
      category: 'Expenses',
      required: false,
      netsuiteValue: '10%'
    },
    {
      id: 'variable_expenses_threshold',
      label: 'Variable expenses threshold',
      value: '$5,000',
      confidence: 61,
      category: 'Expenses',
      required: false,
      netsuiteValue: '$3,000'
    },
    {
      id: 'invoice_addressee_name',
      label: 'Invoice addressee name',
      value: 'Jennifer Walsh',
      confidence: 59,
      category: 'External Team',
      required: true,
      netsuiteValue: 'J. Walsh'
    },
    {
      id: 'invoice_addressee_email',
      label: 'Invoice addressee email',
      value: 'j.walsh@globaltech.com',
      confidence: 67,
      category: 'External Team',
      required: true,
      netsuiteValue: 'jennifer.walsh@globaltech.com'
    },
    {
      id: 'lop_signed_date',
      label: 'Lop signed date',
      value: '2024-02-20',
      confidence: 52,
      category: 'LoP',
      required: true,
      netsuiteValue: ''
    },
    {
      id: 'confidential',
      label: 'Confidential',
      value: 'Yes',
      confidence: 45,
      category: 'Execution',
      required: false,
      netsuiteValue: 'No'
    },
    {
      id: 'sustainability',
      label: 'Sustainability?',
      value: 'Yes',
      confidence: 48,
      category: 'Coding',
      required: false,
      netsuiteValue: ''
    },
    {
      id: 'milestone_date',
      label: 'Milestone date',
      value: '2024-04-30',
      confidence: 63,
      category: 'Invoice Plan',
      required: false,
      netsuiteValue: '2024-05-15'
    },
    {
      id: 'e_billing_yn',
      label: 'e- billing Y/N',
      value: 'No',
      confidence: 57,
      category: 'Invoice Instructions',
      required: false,
      netsuiteValue: 'Yes'
    }
  ]
};