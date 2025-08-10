import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { BarChart, TrendingUp, Users, Clock, CheckCircle, Target } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate("/assessment/intro");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 text-sm font-medium">
            AI-Powered Career Assessment
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Are You Ready for a Career in Business Intelligence?
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover if Business Intelligence aligns with your personality, interests, and career goals through our comprehensive AI-driven assessment based on validated psychological frameworks.
          </p>
          <Button 
            onClick={handleStartAssessment}
            size="lg" 
            className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            Start Assessment
            <TrendingUp className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* What You'll Discover */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What You'll Discover</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border hover:border-primary/50 transition-colors duration-300">
              <CardHeader>
                <Target className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Career Fit Score</CardTitle>
                <CardDescription>
                  Get a comprehensive 0-100 score based on personality, interests, and cognitive alignment with BI roles.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border hover:border-primary/50 transition-colors duration-300">
              <CardHeader>
                <BarChart className="h-8 w-8 text-accent mb-2" />
                <CardTitle>WISCAR Analysis</CardTitle>
                <CardDescription>
                  Deep dive into Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world alignment.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border hover:border-primary/50 transition-colors duration-300">
              <CardHeader>
                <Users className="h-8 w-8 text-success mb-2" />
                <CardTitle>Personalized Path</CardTitle>
                <CardDescription>
                  Receive tailored learning recommendations and alternative career paths based on your unique profile.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Assessment Overview */}
      <section className="py-16 px-6 bg-secondary/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Assessment Structure</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-success mr-3" />
                  Section 1: Psychometric Analysis
                </CardTitle>
                <CardDescription>
                  Evaluate personality compatibility, interests, and motivational fit using validated psychological frameworks including Big 5, Holland Code, and Growth Mindset scales.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-success mr-3" />
                  Section 2: Technical Aptitude
                </CardTitle>
                <CardDescription>
                  Assess logical reasoning, numerical analysis, and foundational knowledge in Excel, SQL, and BI concepts through practical scenarios.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-success mr-3" />
                  Section 3: WISCAR Framework
                </CardTitle>
                <CardDescription>
                  Comprehensive evaluation across six dimensions: Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world alignment.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className="text-center mt-12">
            <div className="flex items-center justify-center text-muted-foreground mb-6">
              <Clock className="h-5 w-5 mr-2" />
              <span className="text-lg">25-30 minutes to complete</span>
            </div>
            <Button 
              onClick={handleStartAssessment}
              size="lg" 
              className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300"
            >
              Begin Your Assessment Journey
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;