
export interface TrackingEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  status: 'completed' | 'current' | 'pending' | 'warning';
  originalLanguage?: string;
  icon?: string;
}

export interface DeliverySummary {
  orderId: string;
  estimatedArrival: string;
  currentStatus: string;
  recipient: string;
}
