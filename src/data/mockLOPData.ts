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
      id: 'customer_name',
      label: 'Customer Name',
      value: 'Acme Corporation Inc.',
      confidence: 98,
      category: 'Customer Details',
      required: true,
      netsuiteValue: 'Acme Corp'
    },
    {
      id: 'contract_value',
      label: 'Total Contract Value',
      value: '$2,450,000',
      confidence: 96,
      category: 'Deal Terms',
      required: true,
      netsuiteValue: '$2,400,000'
    },
    {
      id: 'currency',
      label: 'Currency',
      value: 'USD',
      confidence: 99,
      category: 'Deal Terms',
      required: true,
      netsuiteValue: 'USD'
    },
    {
      id: 'primary_contact',
      label: 'Primary Contact',
      value: 'John Smith',
      confidence: 94,
      category: 'Customer Details',
      required: true,
      netsuiteValue: 'J. Smith'
    },
    {
      id: 'contract_duration',
      label: 'Contract Duration',
      value: '24 months',
      confidence: 92,
      category: 'Deal Terms',
      required: true,
      netsuiteValue: '24'
    },
    {
      id: 'account_manager',
      label: 'Account Manager',
      value: 'Sarah Johnson',
      confidence: 97,
      category: 'Internal Details',
      required: false,
      netsuiteValue: 'Sarah J.'
    },
    {
      id: 'delivery_method',
      label: 'Delivery Method',
      value: 'Cloud-based SaaS',
      confidence: 95,
      category: 'Service Details',
      required: true,
      netsuiteValue: ''
    },
    {
      id: 'billing_frequency',
      label: 'Billing Frequency',
      value: 'Monthly',
      confidence: 93,
      category: 'Payment Info',
      required: true,
      netsuiteValue: 'Monthly'
    }
  ],
  mediumConfidence: [
    {
      id: 'project_start_date',
      label: 'Project Start Date',
      value: '2024-03-15',
      confidence: 87,
      category: 'Dates & Milestones',
      required: true,
      netsuiteValue: '2024-03-01'
    },
    {
      id: 'implementation_timeline',
      label: 'Implementation Timeline',
      value: '6-8 weeks',
      confidence: 82,
      category: 'Dates & Milestones',
      required: true,
      netsuiteValue: '8 weeks'
    },
    {
      id: 'customer_address',
      label: 'Customer Address',
      value: '123 Business Park, Suite 400, New York, NY 10001',
      confidence: 79,
      category: 'Customer Details',
      required: true,
      netsuiteValue: '123 Business Park, New York, NY'
    },
    {
      id: 'payment_terms',
      label: 'Payment Terms',
      value: 'Net 30',
      confidence: 84,
      category: 'Payment Info',
      required: true,
      netsuiteValue: 'Net 30'
    },
    {
      id: 'service_description',
      label: 'Service Description',
      value: 'Enterprise Analytics Platform with Custom Dashboards',
      confidence: 76,
      category: 'Service Details',
      required: true,
      netsuiteValue: ''
    },
    {
      id: 'renewal_terms',
      label: 'Renewal Terms',
      value: 'Auto-renewal with 60-day notice',
      confidence: 73,
      category: 'Deal Terms',
      required: false,
      netsuiteValue: 'Manual renewal'
    },
    {
      id: 'support_level',
      label: 'Support Level',
      value: 'Premium 24/7',
      confidence: 81,
      category: 'Service Details',
      required: true,
      netsuiteValue: 'Standard'
    },
    {
      id: 'discount_applied',
      label: 'Discount Applied',
      value: '15% enterprise discount',
      confidence: 78,
      category: 'Deal Terms',
      required: false,
      netsuiteValue: '10%'
    },
    {
      id: 'customer_industry',
      label: 'Customer Industry',
      value: 'Financial Services',
      confidence: 85,
      category: 'Customer Details',
      required: false,
      netsuiteValue: 'Finance'
    }
  ],
  lowConfidence: [
    {
      id: 'billing_start_date',
      label: 'Billing Start Date',
      value: '2024-04-01',
      confidence: 64,
      category: 'Dates & Milestones',
      required: true,
      netsuiteValue: '2024-04-15'
    },
    {
      id: 'escalation_terms',
      label: 'Escalation Terms',
      value: '5% annual increase',
      confidence: 58,
      category: 'Deal Terms',
      required: false,
      netsuiteValue: ''
    },
    {
      id: 'compliance_requirements',
      label: 'Compliance Requirements',
      value: 'SOC2 Type II, GDPR',
      confidence: 67,
      category: 'Service Details',
      required: true,
      netsuiteValue: 'SOC2'
    },
    {
      id: 'termination_clause',
      label: 'Termination Clause',
      value: '90-day written notice',
      confidence: 61,
      category: 'Deal Terms',
      required: true,
      netsuiteValue: '30-day notice'
    },
    {
      id: 'customer_size',
      label: 'Customer Size',
      value: '500-1000 employees',
      confidence: 55,
      category: 'Customer Details',
      required: false,
      netsuiteValue: '750 employees'
    },
    {
      id: 'integration_requirements',
      label: 'Integration Requirements',
      value: 'Salesforce, Microsoft 365, SAP',
      confidence: 69,
      category: 'Service Details',
      required: true,
      netsuiteValue: 'Salesforce'
    },
    {
      id: 'sla_requirements',
      label: 'SLA Requirements',
      value: '99.9% uptime guarantee',
      confidence: 63,
      category: 'Service Details',
      required: true,
      netsuiteValue: '99.5%'
    },
    {
      id: 'training_included',
      label: 'Training Included',
      value: '40 hours initial training',
      confidence: 52,
      category: 'Service Details',
      required: false,
      netsuiteValue: ''
    },
    {
      id: 'data_migration',
      label: 'Data Migration',
      value: 'Included for up to 5 data sources',
      confidence: 59,
      category: 'Service Details',
      required: true,
      netsuiteValue: 'Not included'
    },
    {
      id: 'penalty_clauses',
      label: 'Penalty Clauses',
      value: 'Late payment: 1.5% monthly',
      confidence: 45,
      category: 'Payment Info',
      required: false,
      netsuiteValue: '1% monthly'
    },
    {
      id: 'customer_references',
      label: 'Customer References',
      value: 'May be used as case study',
      confidence: 48,
      category: 'Customer Details',
      required: false,
      netsuiteValue: ''
    }
  ]
};