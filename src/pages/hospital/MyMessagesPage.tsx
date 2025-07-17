import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { Search, Filter, MoreVertical, Star, StarOff, Trash2, Archive, Send, Paperclip, Smile, Phone, Video, Info, ArrowLeft, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface Message {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  avatar: string;
  lastMessage?: string;
  unreadCount?: number;
  status?: 'online' | 'offline' | 'away';
}

interface ChatMessage {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
  avatar: string;
  status?: 'sent' | 'delivered' | 'read';
}

const MyMessagesPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);
  const [selectedChat, setSelectedChat] = useState<Message | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197c2?w=40&h=40&fit=crop&crop=face",
      lastMessage: "I'm interested in the ultrasound machine you have listed. Could you provide more details about the warranty?",
      unreadCount: 2,
      status: 'online'
    },
    {
      id: 2,
      sender: "Hospital Equipment Co.",
      subject: "New Product Catalog",
      preview: "Check out our latest catalog featuring the newest medical devices and equipment for your facility.",
      timestamp: "1 day ago",
      isRead: true,
      isStarred: false,
      avatar: "https://images.unsplash.com/photo-156472354-b33f0443?w=40&h=40&fit=crop&crop=face",
      lastMessage: "Check out our latest catalog featuring the newest medical devices and equipment for your facility.",
      status: 'away'
    },
    {
      id: 3,
      sender: "Dr. Michael Chen",
      subject: "Equipment Maintenance",
      preview: "The MRI machine we purchased last month needs scheduled maintenance. When would be a good time?",
      timestamp: "3 days ago",
      isRead: true,
      isStarred: false,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1d72282?w=40&h=40&fit=crop&crop=face",
      lastMessage: "The MRI machine we purchased last month needs scheduled maintenance. When would be a good time?",
      status: 'offline'
    },
    {
      id: 4,
      sender: "Medical Supplies Inc.",
      subject: "Order Confirmation #12345",
      preview: "Your order has been confirmed and will be shipped within 2-3 business days. Track your shipment here.",
      timestamp: "1 week ago",
      isRead: true,
      isStarred: true,
      avatar: "https://images.unsplash.com/photo-156472354-b33f0443?w=40&h=40&fit=crop&crop=face",
      lastMessage: "Your order has been confirmed and will be shipped within 2-3 business days. Track your shipment here.",
      status: 'online'
    }
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "Dr. Sarah Johnson",
      content: "Hi there! I'm interested in the ultrasound machine you have listed.",
      timestamp: "10:00 AM",
      isOwn: false,
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197c2?w=40&h=40&fit=crop&crop=face",
      status: 'read'
    },
    {
      id: 2,
      sender: "You",
      content: "Hello! Thank you for your interest. The ultrasound machine is still available.",
      timestamp: "10:02 AM",
      isOwn: true,
      avatar: "",
      status: 'read'
    },
    {
      id: 3,
      sender: "Dr. Sarah Johnson",
      content: "Could you provide more details about the warranty and maintenance history?",
      timestamp: "10:05 AM",
      isOwn: false,
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197c2?w=40&h=40&fit=crop&crop=face",
      status: 'read'
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

  const handleChatSelect = (message: Message) => {
    setSelectedChat(message);
    setShowChat(true);
    // Mark as read when opening chat
    if (!message.isRead) {
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, isRead: true, unreadCount:0} : msg
      ));
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const newChatMessage: ChatMessage = {
        id: chatMessages.length + 1,
        sender: "You",
        content: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        avatar: "",
        status: 'sent'
      };
      setChatMessages(prev => [...prev, newChatMessage]);
      setNewMessage('');
      
      // Update the last message in the conversation list
      setMessages(prev => prev.map(msg => 
        msg.id === selectedChat.id ? { ...msg, lastMessage: newMessage.trim(), timestamp: "Just now" } : msg
      ));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const unreadCount = messages.filter(msg => !msg.isRead).length;
  const starredCount = messages.filter(msg => msg.isStarred).length;

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'online':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'online':
        return 'Online';
      case 'away':
        return 'Away';
      case 'offline':
        return 'Offline';
      default:
        return 'Offline';
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showChat && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChat(false)}
                className="lg:hidden p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {showChat ? selectedChat?.sender : t('myMessages.title')}
              </h1>
              {!showChat && (
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {filteredMessages.length} {t('myMessages.messages')}
                </p>
              )}
            </div>
          </div>
          
          {/* Stats - hidden on mobile when chat is open */}
          {!showChat && (
            <div className="hidden sm:flex space-x-6">
              <div className="text-center">
                <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">{unreadCount}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{t('myMessages.unread')}</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">{starredCount}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{t('myMessages.starred')}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex h-[calc(100vh-88px)]">
        {/* Messages List - hidden on mobile when chat is open */}
        <div className={`${showChat ? 'hidden lg:block' : 'block'} w-full lg:w-80 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col`}>
          {/* Search and Filters */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <div className="space-y-3">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder={t('myMessages.searchPlaceholder')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
                />
              </div>

              {/* Filters */}
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="all">{t('myMessages.allMessages')}</option>
                <option value="unread">{t('myMessages.unread')}</option>
                <option value="starred">{t('myMessages.starred')}</option>
              </select>
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto">
            {filteredMessages.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="text-gray-400 dark:text-gray-500 mb-4">
                  <Search className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {t('myMessages.noMessages')}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  {searchTerm ? t('myMessages.noSearchResults') : t('myMessages.emptyInbox')}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 cursor-pointer group ${
                      !message.isRead ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                    } ${selectedChat?.id === message.id ? 'bg-blue-100 dark:bg-blue-900/30' : ''}`}
                    onClick={() => handleChatSelect(message)}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Avatar */}
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={message.avatar} alt={message.sender} />
                          <AvatarFallback className="text-sm font-medium">{message.sender.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -left-1 rounded-full border-2 border-white dark:border-gray-800 ${getStatusColor(message.status)}`} />
                      </div>

                      {/* Message Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`text-sm font-semibold truncate ${
                            !message.isRead 
                              ? 'text-gray-900 dark:text-white' 
                              : 'text-gray-700 dark:text-gray-300'
                          }`}>
                            {message.sender}
                          </h3>
                          <div className="flex items-center space-x-2">
                            {!message.isRead && message.unreadCount && (
                              <Badge variant="secondary" className="text-xs px-1.5 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                                {message.unreadCount}
                              </Badge>
                            )}
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {message.timestamp}
                            </span>
                          </div>
                        </div>
                        
                        <h4 className={`text-sm font-medium mb-1 truncate ${
                          !message.isRead 
                            ? 'text-gray-900 dark:text-white' 
                            : 'text-gray-700 dark:text-gray-300'
                        }`}>
                          {message.subject}
                        </h4>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate leading-relaxed">
                          {message.lastMessage || message.preview}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => toggleStar(message.id)}>
                              {message.isStarred ? <StarOff className="w-4 h-4 mr-2" /> : <Star className="w-4 h-4 mr-2" />}
                              {message.isStarred ? 'Unstar' : 'Star'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleRead(message.id)}>
                              <Archive className="w-4 h-4 mr-2" />
                              {message.isRead ? 'Mark as unread' : 'Mark as read'}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => deleteMessage(message.id)} className="text-red-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        {showChat && selectedChat && (
          <div className="flex-1 flex-col bg-white dark:bg-gray-800">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={selectedChat.avatar} alt={selectedChat.sender} />
                    <AvatarFallback>{selectedChat.sender.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -left-1 rounded-full border-2 border-white dark:border-gray-800 ${getStatusColor(selectedChat.status)}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{selectedChat.sender}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{getStatusText(selectedChat.status)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <Video className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                  <Info className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900/50">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end space-x-2 max-w-xs lg:max-w-md ${msg.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {!msg.isOwn && (
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={msg.avatar} alt={msg.sender} />
                        <AvatarFallback className="text-xs">{msg.sender.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`px-4 py-2 rounded-2xl ${
                      msg.isOwn 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600'
                    }`}>
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      <div className={`flex items-center justify-between mt-2 ${
                        msg.isOwn ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        <span className="text-xs">{msg.timestamp}</span>
                        {msg.isOwn && (
                          <div className="flex items-center space-x-1">
                            {msg.status === 'sent' && <Clock className="w-3 h-3" />}
                            {msg.status === 'delivered' && <CheckCircle className="w-3 h-3" />}
                            {msg.status === 'read' && <CheckCircle className="w-3 h-3 text-blue-300" />}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" className="h-10 w-10 p-0">
                  <Paperclip className="w-5 h-5" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="pr-12 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 rounded-lg"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <Smile className="w-4 h-4" />
                  </Button>
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white h-10 px-4 rounded-lg"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Empty State - shown when no chat is selected on desktop */}
        {!showChat && (
          <div className="hidden lg:flex flex-1 items-center justify-center bg-gray-50 dark:bg-gray-900">
            <Card className="text-center py-12 md:p-16">
              <CardContent>
                <div className="text-gray-400 dark:text-gray-500 mb-6">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  Select a conversation
                </h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  Choose a message from the list to start chatting with your contacts
                </p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyMessagesPage;
