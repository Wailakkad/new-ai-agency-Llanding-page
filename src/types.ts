export interface ProjectItem {
  id: string;
  title: string;
  discipline: string;
  year: string;
  image: string;
  metric: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  badge: string;
  description: string;
  features: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  specs: string[];
  duration: string;
}

export interface BookingLead {
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
  notes: string;
}
