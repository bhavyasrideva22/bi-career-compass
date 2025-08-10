import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { Brain, Users, TrendingUp, Clock, ChevronRight } from "lucide-react";
import { ProgressIndicator } from "@/components/assessment/ProgressIndicator";

const Introduction = () => {
  const navigate = useNavigate();

  const careerPaths = [
    "Business Intelligence Analyst",
    "Data Analyst", 
    "Reporting Specialist",
    "BI Developer",
    "Analytics Consultant",
    "Data Visualization Specialist"
  ];

  const successTraits = [
    "Logical reasoning and critical thinking",
    "Detail-oriented, curious, and data-driven mindset",
    "Proficiency with data visualization and dashboards", 
    "Communication skills to translate data into insights",
    "Structured problem solving and patience"
  ];

  return (
    <div className="min-h-screen bg-background">
      <ProgressIndicator currentStep={0} totalSteps={4} />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Assessment Introduction
          </Badge>
          <h1 className="text-4xl font-bold mb-6">
            Welcome to Your BI Career Assessment
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            This comprehensive assessment evaluates your psychological, cognitive, and technical readiness for a career in Business Intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <Brain className="h-8 w-8 text-primary mb-3" />
              <CardTitle>What is Business Intelligence?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Business Intelligence involves gathering, analyzing, and visualizing data to help organizations make strategic decisions. BI professionals convert raw data into actionable insights using tools like Power BI, Tableau, Excel, and SQL.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Clock className="h-8 w-8 text-accent mb-3" />
              <CardTitle>Assessment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-muted-foreground">
                <p>• Duration: 25-30 minutes</p>
                <p>• 4 comprehensive sections</p>
                <p>• Multiple question types</p>
                <p>• Personalized results</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <Users className="h-6 w-6 text-success mb-2" />
              <CardTitle>Career Paths in BI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {careerPaths.map((path, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <ChevronRight className="h-4 w-4 text-primary" />
                    <span className="text-sm">{path}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUp className="h-6 w-6 text-primary mb-2" />
              <CardTitle>Skills & Traits That Succeed in BI</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {successTraits.map((trait, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-muted-foreground">{trait}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Button
            onClick={() => navigate("/assessment/psychometric")}
            size="lg"
            className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent"
          >
            Start Assessment
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Introduction;