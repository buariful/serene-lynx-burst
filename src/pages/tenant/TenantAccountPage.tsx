import React, { useState } from "react";
import TenantDashboardWrapper from "@/components/TenantDashboardWrapper";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User2 } from "lucide-react";

const TenantAccountPage: React.FC = () => {
  // Placeholder data
  const [name] = useState("Jane Tenant");
  const [email] = useState("tenant@example.com");
  const [phone] = useState("(555) 123-4567");

  return (
    <TenantDashboardWrapper>
      <div className="max-w-xl mx-auto mt-12">
        <Card className="shadow-md border-slate-200 dark:border-slate-700 dark:bg-slate-800">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <User2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <div>
                <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                  Account Information
                </CardTitle>
                <CardDescription className="text-slate-600 dark:text-slate-400">
                  View your account details below.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 mt-4">
            <div className="space-y-1.5">
              <Label
                htmlFor="name"
                className="text-slate-700 dark:text-slate-300"
              >
                Name
              </Label>
              <Input
                id="name"
                value={name}
                readOnly
                className="rounded-md border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="email"
                className="text-slate-700 dark:text-slate-300"
              >
                Email
              </Label>
              <Input
                id="email"
                value={email}
                readOnly
                className="rounded-md border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="phone"
                className="text-slate-700 dark:text-slate-300"
              >
                Phone
              </Label>
              <Input
                id="phone"
                value={phone}
                readOnly
                className="rounded-md border-slate-300 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </TenantDashboardWrapper>
  );
};

export default TenantAccountPage;
