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

const importantInfo = [
  {
    title: "Who should use this form?",
    description:
      "Tenants who wish to end their tenancy agreement must complete and submit this form to their landlord.",
  },
  {
    title: "Notice period",
    description:
      "You must provide at least 60 days notice before the termination date, unless otherwise agreed.",
  },
  {
    title: "Legal implications",
    description:
      "Ending your tenancy without proper notice may result in legal or financial consequences.",
  },
  // Add more as needed
];

export default function TenantNoticePage() {
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

  return (
    <div>
      <Header />
      <div className="max-w-2xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Tenant's Notice to End the Tenancy (N9)
        </h1>
        {/* First Card */}
        <Card className="mb-6 p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">To</label>
            <Input
              name="to"
              value={form.to}
              onChange={handleChange}
              placeholder="Landlord's Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">From</label>
            <Input
              name="from"
              value={form.from}
              onChange={handleChange}
              placeholder="Tenant's Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Address of the Rental Unit
            </label>
            <Input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Rental Unit Address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Termination date
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
                Important Information from the Landlord and Tenant Board
              </AccordionTrigger>
              <AccordionContent className="bg-gray-50 px-6 pb-6 pt-2">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 flex flex-col gap-4">
                    {importantInfo.map((item, idx) => (
                      <div key={idx} className="text-sm font-semibold mb-2">
                        {item.title}
                      </div>
                    ))}
                  </div>
                  <div className="col-span-2 flex flex-col gap-4">
                    {importantInfo.map((item, idx) => (
                      <div key={idx} className="text-sm text-gray-700 mb-2">
                        {item.description}
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
            <label className="block text-sm font-medium mb-1">Signed by</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="signedBy"
                  value="Tenant"
                  checked={form.signedBy === "Tenant"}
                  onChange={handleChange}
                />{" "}
                Tenant
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="signedBy"
                  value="Representative"
                  checked={form.signedBy === "Representative"}
                  onChange={handleChange}
                />{" "}
                Representative
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">First name</label>
            <Input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Last name</label>
            <Input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Phone number
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
            <label className="block text-sm font-medium mb-1">Signature</label>
            <Input
              name="signature"
              value={form.signature}
              onChange={handleChange}
              placeholder="Type your signature"
            />
          </div>
        </Card>
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </div>

      <Footer />
    </div>
  );
}
