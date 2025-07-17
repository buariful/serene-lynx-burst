import React, { useState } from "react";
import LandlordDashboardWrapper from "@/components/LandlordDashboardWrapper";
import { Bell, Eye, EyeOff, Filter, Search, X, Calendar, MapPin, DollarSign, User, MessageSquare, CheckCircle, AlertTriangle, Info, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess, showError } from "@/utils/toast";

interface Notification {
  id: string;
  type: 'inquiry' | 'application' | 'payment' | 'maintenance' | 'system' | 'market' | 'reminder';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  sender?: string;
  propertyId?: string;
  propertyAddress?: string;
  amount?: number;
  date?: string;
  actionRequired?: boolean;
  actionLabel?: string;
}

const NotificationsPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showRead, setShowRead] = useState(true);
  const [sortBy, setSortBy] = useState("recent");
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "inquiry",
      title: "New Rental Inquiry",
      message: "Dr. Sarah Johnson has inquired about your 2-bedroom apartment at 123 Main St. They're interested in viewing the property this weekend.",
      timestamp: "2024-01-15T10:30:00Z",
      read: false,
      priority: "high",
      sender: "Dr. Sarah Johnson",
      propertyId: "prop-001",
      propertyAddress: "123 Main St, Apt 4B",
      actionRequired: true,
      actionLabel: "Respond to Inquiry"
    },
    {
      id: "2",
      type: "application",
      title: "Rental Application Submitted",
      message: "A complete rental application has been submitted for 456 Oak Ave. Please review the applicant's information and documents.",
      timestamp: "2024-01-15T09:15:00Z",
      read: false,
      priority: "high",
      sender: "Michael Chen",
      propertyId: "prop-002",
      propertyAddress: "456 Oak Ave",
      actionRequired: true,
      actionLabel: "Review Application"
    },
    {
      id: "3",
      type: "payment",
      title: "Rent Payment Received",
      message: "Rent payment of $2,200 has been received for 789 Pine St. The payment has been processed and is now available in your account.",
      timestamp: "2024-01-15T08:45:00Z",
      read: true,
      priority: "medium",
      propertyId: "prop-003",
      propertyAddress: "789 Pine St",
      amount: 2200
    },
    {
      id: "4",
      type: "maintenance",
      title: "Maintenance Request Updated",
      message: "The plumbing issue at 321 Elm St has been resolved. The tenant has confirmed the repair is working properly.",
      timestamp: "2024-01-14T16:20:00Z",
      read: true,
      priority: "medium",
      propertyId: "prop-004",
      propertyAddress: "321 Elm St",
      actionRequired: false
    },
    {
      id: "5",
      type: "market",
      title: "Market Update: Your Area",
      message: "Rental prices in your area have increased by 3.2% this month. Consider reviewing your current rental rates.",
      timestamp: "2024-01-14T14:30:00Z",
      read: false,
      priority: "low",
      actionRequired: false
    },
    {
      id: "6",
      type: "reminder",
      title: "Lease Renewal Reminder",
      message: "The lease for 654 Maple Dr expires in 30 days. Contact the tenant to discuss renewal options.",
      timestamp: "2024-01-14T12:00:00Z",
      read: false,
      priority: "medium",
      propertyId: "prop-005",
      propertyAddress: "654 Maple Dr",
      date: "2024-02-14",
      actionRequired: true,
      actionLabel: "Contact Tenant"
    },
    {
      id: "7",
      type: "system",
      title: "System Maintenance Scheduled",
      message: "Scheduled maintenance will occur on January 16th from 2:00 AM to 4:00 AM EST. Some features may be temporarily unavailable.",
      timestamp: "2024-01-13T18:00:00Z",
      read: true,
      priority: "low",
      date: "2024-01-16",
      actionRequired: false
    },
    {
      id: "8",
      type: "inquiry",
      title: "Property Viewing Request",
      message: "Dr. Emily Rodriguez would like to schedule a viewing for your studio apartment at 987 Cedar Ln. They're available this Thursday afternoon.",
      timestamp: "2024-01-13T15:30:00Z",
      read: true,
      priority: "medium",
      sender: "Dr. Emily Rodriguez",
      propertyId: "prop-006",
      propertyAddress: "987 Cedar Ln",
      actionRequired: true,
      actionLabel: "Schedule Viewing"
    }
  ]);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'inquiry':
        return <MessageSquare className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />;
      case 'application':
        return <User className="w-4 h-4 md:w-5 md:h-5 text-green-500" />;
      case 'payment':
        return <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-green-500" />;
      case 'maintenance':
        return <AlertTriangle className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />;
      case 'system':
        return <Settings className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />;
      case 'market':
        return <Info className="w-4 h-4 md:w-5 md:h-5 text-purple-500" />;
      case 'reminder':
        return <Calendar className="w-4 h-4 md:w-5 md:h-5 text-yellow-500" />;
      default:
        return <Bell className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
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

  const getTypeLabel = (type: Notification['type']) => {
    switch (type) {
      case 'inquiry':
        return 'Inquiry';
      case 'application':
        return 'Application';
      case 'payment':
        return 'Payment';
      case 'maintenance':
        return 'Maintenance';
      case 'system':
        return 'System';
      case 'market':
        return 'Market';
      case 'reminder':
        return 'Reminder';
      default:
        return 'Notification';
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

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    showSuccess("Notification marked as read");
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
    showSuccess("All notifications marked as read");
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    showSuccess("Notification deleted");
  };

  const handleAction = (notification: Notification) => {
    showSuccess(`${notification.actionLabel} action initiated`);
  };

  // Filter notifications based on search and filters
  const filteredNotifications = notifications
    .filter(notification => {
      const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           notification.sender?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           notification.propertyAddress?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = filterType === 'all' || notification.type === filterType;
      const matchesReadStatus = showRead || !notification.read;
      
      return matchesSearch && matchesType && matchesReadStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'unread':
          return (b.read ? 0 : 1) - (a.read ? 0 : 1);
        default:
          return 0;
      }
    });

  const unreadCount = notifications.filter(notification => !notification.read).length;
  const actionRequiredCount = notifications.filter(notification => notification.actionRequired && !notification.read).length;

  return (
    <LandlordDashboardWrapper>
      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Bell className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400" />
              Notifications
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2 text-xs md:text-sm">
                  {unreadCount} new
                </Badge>
              )}
            </h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 mt-1">
              Stay updated with important messages and updates
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowRead(!showRead)}
              className="flex items-center gap-2 text-xs md:text-sm"
            >
              {showRead ? <EyeOff className="w-3 h-3 md:w-4 md:h-4" /> : <Eye className="w-3 h-3 md:w-4 md:h-4" />}
              {showRead ? 'Hide Read' : 'Show Read'}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2 text-xs md:text-sm"
              onClick={markAllAsRead}
            >
              <Filter className="w-3 h-3 md:w-4 md:h-4" />
              Mark All Read
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Total Notifications</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100">{notifications.length}</p>
                </div>
                <Bell className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Unread</p>
                  <p className="text-xl md:text-2xl font-bold text-red-600 dark:text-red-400">{unreadCount}</p>
                </div>
                <div className="w-6 h-6 md:w-8 md:h-8 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                  <span className="text-red-600 dark:text-red-400 text-xs md:text-sm font-bold">!</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-3 md:p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">Action Required</p>
                  <p className="text-xl md:text-2xl font-bold text-orange-600 dark:text-orange-400">{actionRequiredCount}</p>
                </div>
                <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-orange-600 dark:text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 text-sm md:text-base"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                >
                  <X className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="text-sm md:text-base">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="inquiry">Inquiries</SelectItem>
              <SelectItem value="application">Applications</SelectItem>
              <SelectItem value="payment">Payments</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="market">Market</SelectItem>
              <SelectItem value="reminder">Reminders</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="text-sm md:text-base">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="unread">Unread First</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Notifications List */}
        <div className="space-y-3 md:space-y-4">
          {filteredNotifications.length === 0 ? (
            <Card className="text-center py-8 md:py-12">
              <CardContent>
                <Bell className="w-12 h-12 md:w-16 md:h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  No notifications found
                </h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                  {searchTerm || filterType !== 'all' 
                    ? 'Try adjusting your search or filters'
                    : 'You\'re all caught up! No new notifications at this time.'}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`transition-all duration-200 hover:shadow-md ${
                  !notification.read ? 'border-l-4 border-l-blue-500 bg-blue-50 dark:bg-blue-950/20' : ''
                }`}
              >
                <CardContent className="p-3 md:p-4">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className={`font-semibold text-sm md:text-base ${
                            !notification.read ? 'text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {notification.title}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            {getTypeLabel(notification.type)}
                          </Badge>
                          <Badge className={`text-xs ${getPriorityColor(notification.priority)}`}>
                            {notification.priority}
                          </Badge>
                          {notification.actionRequired && (
                            <Badge variant="destructive" className="text-xs">
                              Action Required
                            </Badge>
                          )}
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <span>{formatTimestamp(notification.timestamp)}</span>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-0"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {notification.message}
                      </p>
                      
                      {(notification.sender || notification.propertyAddress || notification.amount || notification.date) && (
                        <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs text-gray-500 dark:text-gray-400 mb-3">
                          {notification.sender && (
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span>{notification.sender}</span>
                            </div>
                          )}
                          {notification.propertyAddress && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{notification.propertyAddress}</span>
                            </div>
                          )}
                          {notification.amount && (
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3" />
                              <span>${notification.amount.toLocaleString()}</span>
                            </div>
                          )}
                          {notification.date && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{new Date(notification.date).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="flex flex-col sm:flex-row gap-2">
                        {notification.actionRequired && notification.actionLabel && (
                          <Button 
                            size="sm" 
                            className="flex items-center gap-2 text-xs md:text-sm"
                            onClick={() => handleAction(notification)}
                          >
                            <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                            {notification.actionLabel}
                          </Button>
                        )}
                        <Button size="sm" variant="outline" className="text-xs md:text-sm" onClick={() => showSuccess(`Viewing details for: ${notification.title}`)}>
                          View Details
                        </Button>
                        {!notification.read && (
                          <Button 
                            size="sm" 
                            variant="ghost" 
                            className="text-xs md:text-sm"
                            onClick={() => markAsRead(notification.id)}
                          >
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

export default NotificationsPage;
