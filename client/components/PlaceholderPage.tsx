import { ReactNode } from "react";
import { Construction, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: ReactNode;
  features?: string[];
}

export default function PlaceholderPage({ title, description, icon, features }: PlaceholderPageProps) {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-industrial-panel rounded-full border-2 border-dashed border-gray-300">
              {icon}
            </div>
          </div>
          <h1 className="text-3xl font-bold text-industrial-navy">{title}</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">{description}</p>
        </div>

        {/* Under Construction Card */}
        <Card className="border-dashed border-2 border-gray-300">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2 text-industrial-warning">
              <Construction className="w-6 h-6" />
              <span>Under Construction</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-gray-600">
              This page is currently being developed. The {title.toLowerCase()} functionality will include:
            </p>
            
            {features && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-left">
                    <ArrowRight className="w-4 h-4 text-industrial-success" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-4">
              <Button 
                variant="outline" 
                className="border-industrial-navy text-industrial-navy hover:bg-industrial-navy hover:text-white"
              >
                Request Implementation
              </Button>
            </div>
            
            <p className="text-xs text-gray-500">
              Continue prompting to have this page implemented with full functionality
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
