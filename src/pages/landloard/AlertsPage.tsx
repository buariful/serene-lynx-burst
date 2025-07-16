import React, { useState } from "react";
import LandlordDashboardWrapper from "@/components/LandlordDashboardWrapper";
import { AlertCircle, Bell, Eye, EyeOff, Filter, Search, X, Calendar, MapPin, DollarSign } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Alert {
  id: string;
  type: 'rent_due' | 'maintenance' | 'inquiry' | 'viewing' | 'payment' | 'system';
  title: string;
  message: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
  propertyId?: string;
  propertyAddress?: string;
  amount?: number;
  date?: string;
}

const AlertsPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [showRead, setShowRead] = useState(true);

  // Mock data for alerts
  const alerts: Alert[] = [
    {
      id: "1",
      type: "rent_due",
      title: "Rent Payment Due",
      message: "Rent payment of $2,200 is due in 3 days for 123 Main St, Apt 4B",
      timestamp: "2024-01-15T10:30:00Z",
      priority: "high",
      read: false,
      propertyId: "prop-001",
      propertyAddress: "123 Main St, Apt 4B",
      amount: 2200,
      date: "2024-01-18"
    },
    {
      id: "2",
      type: "maintenance",
      title: "Maintenance Request",
      message: "New maintenance request submitted for 456 Oak Ave - Plumbing issue reported",
      timestamp: "2024-01-15T09:15:00Z",
      priority: "medium",
      read: false,
      propertyId: "prop-002",
      propertyAddress: "456 Oak Ave"
    },
    {
      id: "3",
      type: "inquiry",
      title: "New Rental Inquiry",
      message: "Dr. Sarah Johnson inquired about your 2-bedroom apartment at 789 Pine St",
      timestamp: "2024-01-15T08:45:00Z",
      priority: "medium",
      read: true,
      propertyId: "prop-003",
      propertyAddress: "789 Pine St"
    },
    {
      id: "4",
      type: "viewing",
      title: "Property Viewing Scheduled",
      message: "Property viewing scheduled for 321 Elm St on January 20th at 2:00 PM",
      timestamp: "2024-01-14T16:20:00Z",
      priority: "low",
      read: true,
      propertyId: "prop-004",
      propertyAddress: "321 Elm St",
      date: "2024-01-20"
    },
    {
      id: "5",
      type: "payment",
      title: "Payment Received",
      message: "Rent payment of $1,800 received for 654 Maple Dr",
      timestamp: "2024-01-14T14:30:00Z",
      priority: "low",
      read: true,
      propertyId: "prop-005",
      propertyAddress: "654 Maple Dr",
      amount: 1800
    },
    {
      id: "6",
      type: "system",
      title: "System Maintenance",
      message: "Scheduled system maintenance on January 16th from 2:00 AM to 4:00 AM EST",
      timestamp: "2024-01-14T12:00:00Z",
      priority: "low",
      read: false,
      date: "2024-01-16"
    }
  ];

  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'rent_due':
        return <DollarSign className="w-5 h-5 text-red-500" />;
      case 'maintenance':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'inquiry':
        return <Bell className="w-5 h-5 text-blue-500" />;
      case 'viewing':
        return <Calendar className="w-5 h-5 text-green-500" />;
      case 'payment':
        return <DollarSign className="w-5 h-5 text-green-500" />;
      case 'system':
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: Alert['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'low':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getTypeLabel = (type: Alert['type']) => {
    switch (type) {
      case 'rent_due':
        return 'Rent Due';
      case 'maintenance':
        return 'Maintenance';
      case 'inquiry':
        return 'Inquiry';
      case 'viewing':
        return 'Viewing';
      case 'payment':
        return 'Payment';
      case 'system':
        return 'System';
      default:
        return 'Alert';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  // Filter alerts based on search and filters
  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.propertyAddress?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || alert.type === filterType;
    const matchesPriority = filterPriority === 'all' || alert.priority === filterPriority;
    const matchesReadStatus = showRead || !alert.read;
    
    return matchesSearch && matchesType && matchesPriority && matchesReadStatus;
  });

  const unreadCount = alerts.filter(alert => !alert.read).length;

  return (
    <LandlordDashboardWrapper>
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              Alerts
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount} new
                </Badge>
              )}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Stay updated with important notifications about your properties
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowRead(!showRead)}
              className="flex items-center gap-2"
            >
              {showRead ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showRead ? 'Hide Read' : 'Show Read'}
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Mark All Read
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="rent_due">Rent Due</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="inquiry">Inquiry</SelectItem>
              <SelectItem value="viewing">Viewing</SelectItem>
              <SelectItem value="payment">Payment</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="high">High Priority</SelectItem>
              <SelectItem value="medium">Medium Priority</SelectItem>
              <SelectItem value="low">Low Priority</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <Card className="text-center py-12">
              <CardContent>
                <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  No alerts found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {searchTerm || filterType !== 'all' || filterPriority !== 'all' 
                    ? 'Try adjusting your search or filters'
                    : 'You\'re all caught up! No new alerts at this time.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredAlerts.map((alert) => (
              <Card 
                key={alert.id} 
                className={`transition-all duration-200 hover:shadow-md ${
                  !alert.read ? 'border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-950/20' : ''
                }`}
              >
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {getAlertIcon(alert.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className={`font-semibold text-sm md:text-base ${
                            !alert.read ? 'text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {alert.title}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {getTypeLabel(alert.type)}
                          </Badge>
                          <Badge className={`text-xs ${getPriorityColor(alert.priority)}`}>
                            {alert.priority}
                          </Badge>
                          {!alert.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>{formatTimestamp(alert.timestamp)}</span>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {alert.message}
                      </p>
                      
                      {(alert.propertyAddress || alert.amount || alert.date) && (
                        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                          {alert.propertyAddress && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{alert.propertyAddress}</span>
                            </div>
                          )}
                          {alert.amount && (
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              <span>${alert.amount.toLocaleString()}</span>
                            </div>
                          )}
                          {alert.date && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(alert.date).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                        {!alert.read && (
                          <Button size="sm" variant="ghost">
                            Mark as Read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </LandlordDashboardWrapper>
  );
};

export default AlertsPage;
