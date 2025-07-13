import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Search, Filter, MoreVertical, Star, StarOff, Trash2, Reply, Archive } from 'lucide-react';

interface Message {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  avatar: string;
}

const MyMessagesPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);

  // Mock data - replace with actual API call
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Dr. Sarah Johnson",
      subject: "Medical Device Inquiry",
      preview: "I'm interested in the ultrasound machine you have listed. Could you provide more details about the warranty?",
      timestamp: "2 hours ago",
      isRead: false,
      isStarred: true,
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 2,
      sender: "Hospital Equipment Co.",
      subject: "New Product Catalog",
      preview: "Check out our latest catalog featuring the newest medical devices and equipment for your facility.",
      timestamp: "1 day ago",
      isRead: true,
      isStarred: false,
      avatar: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 3,
      sender: "Dr. Michael Chen",
      subject: "Equipment Maintenance",
      preview: "The MRI machine we purchased last month needs scheduled maintenance. When would be a good time?",
      timestamp: "3 days ago",
      isRead: true,
      isStarred: false,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face"
    },
    {
      id: 4,
      sender: "Medical Supplies Inc.",
      subject: "Order Confirmation #12345",
      preview: "Your order has been confirmed and will be shipped within 2-3 business days. Track your shipment here.",
      timestamp: "1 week ago",
      isRead: true,
      isStarred: true,
      avatar: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=40&h=40&fit=crop&crop=face"
    }
  ]);

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.preview.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'unread' && !message.isRead) ||
                         (filter === 'starred' && message.isStarred);

    return matchesSearch && matchesFilter;
  });

  const toggleStar = (id: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, isStarred: !msg.isStarred } : msg
    ));
  };

  const toggleRead = (id: number) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, isRead: !msg.isRead } : msg
    ));
  };

  const deleteMessage = (id: number) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  const toggleSelect = (id: number) => {
    setSelectedMessages(prev => 
      prev.includes(id) ? prev.filter(msgId => msgId !== id) : [...prev, id]
    );
  };

  const unreadCount = messages.filter(msg => !msg.isRead).length;
  const starredCount = messages.filter(msg => msg.isStarred).length;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t('myMessages.title')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              {filteredMessages.length} {t('myMessages.messages')}
            </p>
          </div>
          
          {/* Stats */}
          <div className="hidden sm:flex space-x-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">{unreadCount}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{t('myMessages.unread')}</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">{starredCount}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{t('myMessages.starred')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder={t('myMessages.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">{t('myMessages.allMessages')}</option>
              <option value="unread">{t('myMessages.unread')}</option>
              <option value="starred">{t('myMessages.starred')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="max-w-4xl mx-auto">
        {filteredMessages.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {t('myMessages.noMessages')}
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              {searchTerm ? t('myMessages.noSearchResults') : t('myMessages.emptyInbox')}
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 ${
                  !message.isRead ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
              >
                <div className="flex items-center p-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0 mr-4">
                    <img
                      src={message.avatar}
                      alt={message.sender}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </div>

                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <h3 className={`text-sm font-medium truncate ${
                          !message.isRead 
                            ? 'text-gray-900 dark:text-white' 
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {message.sender}
                        </h3>
                        {!message.isRead && (
                          <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                        {message.timestamp}
                      </span>
                    </div>
                    
                    <h4 className={`text-sm font-medium mb-1 truncate ${
                      !message.isRead 
                        ? 'text-gray-900 dark:text-white' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {message.subject}
                    </h4>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {message.preview}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => toggleStar(message.id)}
                      className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        message.isStarred ? 'text-yellow-500' : 'text-gray-400'
                      }`}
                    >
                      {message.isStarred ? <Star className="w-4 h-4 fill-current" /> : <StarOff className="w-4 h-4" />}
                    </button>
                    
                    <button
                      onClick={() => toggleRead(message.id)}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      <Archive className="w-4 h-4" />
                    </button>
                    
                    <button
                      onClick={() => deleteMessage(message.id)}
                      className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyMessagesPage;
