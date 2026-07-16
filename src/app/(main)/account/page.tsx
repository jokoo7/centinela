import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDaysIcon, ShieldIcon, UserIcon } from 'lucide-react';
import React from 'react';

export default function AccountPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here&apos;s your account overview.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="size-5" />
            Profile Information
          </CardTitle>
          <CardDescription>Your account details and current status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex items-center justify-center">
              <Avatar className="size-32 sm:size-24">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="shadcn"
                  className="aspect-square object-cover"
                />
                <AvatarFallback>LR</AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-2xl font-semibold">Joko Santoso</h3>
                <p className="text-muted-foreground">your@gmail.com</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDaysIcon className="size-4" />
                  Member Since
                </div>
                <p className="font-medium">January 2026</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Tabs defaultValue="profile">
        <TabsList variant="line">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <div className="mt-8 mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold">Account details</h3>
              <p className="mt-1 text-sm">Update your personal information</p>
            </div>
          </div>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="fieldgroup-name">Name</FieldLabel>
              <Input id="fieldgroup-name" placeholder="Jordan Lee" />
            </Field>
            <Field>
              <FieldLabel htmlFor="fieldgroup-email">Email</FieldLabel>
              <Input id="fieldgroup-email" type="email" placeholder="name@example.com" />
              <FieldDescription>We&apos;ll send updates to this address.</FieldDescription>
            </Field>
            <Field orientation="horizontal">
              <Button type="reset" variant="outline">
                Reset
              </Button>
              <Button type="submit">Submit</Button>
            </Field>
          </FieldGroup>
        </TabsContent>
        <TabsContent value="security">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis eum nam dolorum? Expedita
          eveniet vitae eum illo quo corporis natus.
        </TabsContent>
      </Tabs>
    </div>
  );
}
