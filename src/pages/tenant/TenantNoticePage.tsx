import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";
import { useTranslation } from 'react-i18next';

const importantInfo = [
  {
    titleKey: "tenantNoticePage.importantInfo.whoShouldUse",
    descriptionKey: "tenantNoticePage.importantInfo.whoShouldUseDesc",
  },
  {
    titleKey: "tenantNoticePage.importantInfo.noticePeriod",
    descriptionKey: "tenantNoticePage.importantInfo.noticePeriodDesc",
  },
  {
    titleKey: "tenantNoticePage.importantInfo.legalImplications",
    descriptionKey: "tenantNoticePage.importantInfo.legalImplicationsDesc",
  },
];

export default function TenantNoticePage() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    to: "",
    from: "",
    address: "",
    terminationDate: "",
    signedBy: "Tenant",
    firstName: "",
    lastName: "",
    phone: "",
    signature: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t('tenantNoticePage.noticeSubmitted'));
    setForm({
      to: "",
      from: "",
      address: "",
      terminationDate: "",
      signedBy: "Tenant",
      firstName: "",
      lastName: "",
      phone: "",
      signature: "",
    });
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <div className="max-w-2xl mx-auto py-10 px-4">
          <h1 className="text-2xl font-bold mb-6 text-center">
            {t('tenantNoticePage.title')}
          </h1>
          {/* First Card */}
          <Card className="mb-6 p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">{t('tenantNoticePage.to')}</label>
              <Input
                name="to"
                value={form.to}
                onChange={handleChange}
                placeholder={t('tenantNoticePage.landlordNamePlaceholder')}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">{t('tenantNoticePage.from')}</label>
              <Input
                name="from"
                value={form.from}
                onChange={handleChange}
                placeholder={t('tenantNoticePage.tenantNamePlaceholder')}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {t('tenantNoticePage.rentalUnitAddress')}
              </label>
              <Input
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder={t('tenantNoticePage.addressPlaceholder')}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                {t('tenantNoticePage.terminationDate')}
              </label>
              <Input
                name="terminationDate"
                type="date"
                value={form.terminationDate}
                onChange={handleChange}
              />
            </div>
          </Card>
          {/* Accordion Card */}
          <Card className="mb-6 p-0 overflow-hidden">
            <Accordion type="single" collapsible>
              <AccordionItem value="info">
                <AccordionTrigger className="px-6 py-4 text-lg font-semibold">
                  {t('tenantNoticePage.importantInformationTitle')}
                </AccordionTrigger>
                <AccordionContent className="bg-gray-50 px-6 pb-6 pt-2">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1 flex flex-col gap-4">
                      {importantInfo.map((item, idx) => (
                        <div key={idx} className="text-sm font-semibold mb-2">
                          {t(item.titleKey)}
                        </div>
                      ))}
                    </div>
                    <div className="col-span-2 flex flex-col gap-4">
                      {importantInfo.map((item, idx) => (
                        <div key={idx} className="text-sm text-gray-700 mb-2">
                          {t(item.descriptionKey)}
                        </div>
                      ))}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
          {/* Signature Card */}
          <Card className="mb-6 p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {t('tenantNoticePage.signedBy')}
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="signedBy"
                    value="Tenant"
                    checked={form.signedBy === "Tenant"}
                    onChange={handleChange}
                  />{" "}
                  {t('tenantNoticePage.tenant')}
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="signedBy"
                    value="Representative"
                    checked={form.signedBy === "Representative"}
                    onChange={handleChange}
                  />{" "}
                  {t('tenantNoticePage.representative')}
                </label>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {t('tenantNoticePage.firstName')}
              </label>
              <Input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {t('tenantNoticePage.lastName')}
              </label>
              <Input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                {t('tenantNoticePage.phoneNumber')}
              </label>
              <PhoneInput
                international
                defaultCountry="CA"
                value={form.phone}
                onChange={(phone) =>
                  setForm((f) => ({ ...f, phone: phone || "" }))
                }
                className="w-full"
                inputComponent={Input}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                {t('tenantNoticePage.signature')}
              </label>
              <Input
                name="signature"
                value={form.signature}
                onChange={handleChange}
                placeholder={t('tenantNoticePage.signaturePlaceholder')}
              />
            </div>
          </Card>
          <Button className="w-full" type="submit">
            {t('tenantNoticePage.submit')}
          </Button>
        </div>
      </form>
      <Footer />
    </div>
  );
}
