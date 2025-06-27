import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('slideInUp', [
      transition(':enter', [
        style({ transform: 'translateY(100px)', opacity: 0 }),
        animate('600ms ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('800ms ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('scaleIn', [
      transition(':enter', [
        style({ transform: 'scale(0.8)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
      ])
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(-100px)' }),
          stagger(100, [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit {

  isBlueTheme = false;

  // Static dashboard data
  stats = [
    { title: 'Total Sales', value: '$45,230', change: '+12%', icon: 'fas fa-dollar-sign', color: 'success' },
    { title: 'Orders', value: '1,234', change: '+8%', icon: 'fas fa-shopping-cart', color: 'primary' },
    { title: 'Customers', value: '856', change: '+15%', icon: 'fas fa-users', color: 'info' },
    { title: 'Products', value: '342', change: '+3%', icon: 'fas fa-box', color: 'warning' }
  ];

  recentOrders = [
    { id: '#12345', customer: 'John Doe', product: 'iPhone 14 Pro', amount: '$999', status: 'Completed', date: '2024-01-15' },
    { id: '#12346', customer: 'Jane Smith', product: 'MacBook Air', amount: '$1,299', status: 'Processing', date: '2024-01-14' },
    { id: '#12347', customer: 'Mike Johnson', product: 'AirPods Pro', amount: '$249', status: 'Shipped', date: '2024-01-13' },
    { id: '#12348', customer: 'Sarah Wilson', product: 'iPad Pro', amount: '$799', status: 'Pending', date: '2024-01-12' },
    { id: '#12349', customer: 'Tom Brown', product: 'Apple Watch', amount: '$399', status: 'Completed', date: '2024-01-11' }
  ];

  topProducts = [
    { name: 'iPhone 14 Pro', sales: 245, revenue: '$244,755', trend: 'up' },
    { name: 'MacBook Air', sales: 189, revenue: '$245,511', trend: 'up' },
    { name: 'AirPods Pro', sales: 156, revenue: '$38,844', trend: 'down' },
    { name: 'iPad Pro', sales: 134, revenue: '$107,066', trend: 'up' },
    { name: 'Apple Watch', sales: 98, revenue: '$39,102', trend: 'up' }
  ];

  salesData = [
    { month: 'Jan', sales: 12000 },
    { month: 'Feb', sales: 19000 },
    { month: 'Mar', sales: 15000 },
    { month: 'Apr', sales: 25000 },
    { month: 'May', sales: 22000 },
    { month: 'Jun', sales: 30000 }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'completed': return 'badge-success';
      case 'processing': return 'badge-warning';
      case 'shipped': return 'badge-info';
      case 'pending': return 'badge-secondary';
      default: return 'badge-secondary';
    }
  }

  getTrendIcon(trend: string): string {
    return trend === 'up' ? 'fas fa-arrow-up text-success' : 'fas fa-arrow-down text-danger';
  }

  toggleTheme(): void {
    this.isBlueTheme = !this.isBlueTheme;
  }
}