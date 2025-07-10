import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Logo from "@/components/Logo";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { showSuccess } from "@/utils/toast";
import FAQ from "@/components/FAQ";
import { Mail, Phone, MapPin, Users } from "lucide-react";
import { useTranslation } from 'react-i18next';

const ContactUsPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { t } = useTranslation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForm({ name: "", email: "", message: "" });
    showSuccess("Thank you for contacting us! We'll be in touch soon.");
    // Here you would handle sending the form data to your backend or email service
  };

  return (
    <div className="bg-gray-50 dark:bg-[hsl(var(--background))] min-h-screen">
      <Header />
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center py-10 bg-gradient-to-b from-blue-50 to-gray-50 dark:from-[hsl(var(--muted))] dark:to-[hsl(var(--background))]">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mt-4 mb-2">
          {t('contactUsPage.title')}
        </h1>
        <p className="text-gray-600 dark:text-[hsl(var(--foreground))] max-w-xl text-center mb-4">
          {t('contactUsPage.subtitle')}
        </p>
      </div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-2 pb-12">
        {/* Contact Options Card */}
        <div className="md:col-span-1">
          <Card className="md:col-span-1 flex flex-col gap-4 justify-between bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] border-[hsl(var(--border))]">
            <CardHeader>
              <CardTitle className="text-blue-700 dark:text-blue-400 text-lg">
                {t('contactUsPage.contactInfo')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="text-blue-600 dark:text-blue-400" />
                <span className="font-medium text-[hsl(var(--foreground))]">support@yourdomain.com</span>
                <Badge>Email</Badge>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-blue-600 dark:text-blue-400" />
                <span className="font-medium text-[hsl(var(--foreground))]">+1 (234) 567-890</span>
                <Badge variant="secondary">Phone</Badge>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="text-blue-600 dark:text-blue-400" />
                <span className="font-medium text-[hsl(var(--foreground))]">
                  123 Main Street, Toronto, ON, Canada
                </span>
                <Badge variant="outline">Address</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Contact Form Card */}
        <Card className="md:col-span-2 bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] border-[hsl(var(--border))]">
          <CardHeader>
            <CardTitle className="text-blue-700 dark:text-blue-400 text-lg">
              {t('contactUsPage.sendMessage')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className="block text-gray-700 dark:text-[hsl(var(--foreground))] mb-0.5 text-xs"
                  htmlFor="name"
                >
                  {t('contactUsPage.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 dark:bg-[hsl(var(--input))] dark:text-[hsl(var(--foreground))] dark:border-[hsl(var(--border))]"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 dark:text-[hsl(var(--foreground))] mb-0.5 text-xs"
                  htmlFor="email"
                >
                  {t('contactUsPage.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 dark:bg-[hsl(var(--input))] dark:text-[hsl(var(--foreground))] dark:border-[hsl(var(--border))]"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 dark:text-[hsl(var(--foreground))] mb-0.5 text-xs"
                  htmlFor="message"
                >
                  {t('contactUsPage.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 dark:bg-[hsl(var(--input))] dark:text-[hsl(var(--foreground))] dark:border-[hsl(var(--border))]"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 rounded text-sm"
              >
                {t('contactUsPage.sendMessageBtn')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      {/* Support Team Section */}
      <div className="max-w-5xl mx-auto px-2 pb-12">
        <Card className="bg-[hsl(var(--card))] text-[hsl(var(--card-foreground))] border-[hsl(var(--border))]">
          <CardHeader>
            <CardTitle className="text-blue-700 dark:text-blue-400 text-lg flex items-center gap-2">
              <Users className="w-5 h-5" /> {t('contactUsPage.supportTeam')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-8 justify-center items-center">
              <div className="flex flex-col items-center">
                <Avatar>
                  <AvatarImage src="/public/logo.png" alt="Support 1" />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <span className="mt-2 font-medium text-sm text-[hsl(var(--foreground))]">Alex Brown</span>
                <span className="text-xs text-gray-500 dark:text-[hsl(var(--muted-foreground))]">{t('contactUsPage.customerSuccess')}</span>
              </div>
              <div className="flex flex-col items-center">
                <Avatar>
                  <AvatarImage src="/public/logo.png" alt="Support 2" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <span className="mt-2 font-medium text-sm text-[hsl(var(--foreground))]">Jamie Smith</span>
                <span className="text-xs text-gray-500 dark:text-[hsl(var(--muted-foreground))]">{t('contactUsPage.techSupport')}</span>
              </div>
              <div className="flex flex-col items-center">
                <Avatar>
                  <AvatarImage src="/public/logo.png" alt="Support 3" />
                  <AvatarFallback>LK</AvatarFallback>
                </Avatar>
                <span className="mt-2 font-medium text-sm text-[hsl(var(--foreground))]">Lee Kim</span>
                <span className="text-xs text-gray-500 dark:text-[hsl(var(--muted-foreground))]">{t('contactUsPage.partnerships')}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* FAQ Section */}
      <FAQ />
      <Footer />
    </div>
  );
};

export default ContactUsPage;
