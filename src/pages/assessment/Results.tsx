import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Download, 
  Home, 
  Target,
  Heart,
  Zap,
  Brain,
  BookOpen,
  Globe,
  TrendingUp
} from "lucide-react";
import { ProgressIndicator } from "@/components/assessment/ProgressIndicator";

interface AssessmentScores {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
  overallScore: number;
  recommendation: "YES" | "MAYBE" | "NO";
}

const Results = () => {
  const navigate = useNavigate();
  const [scores, setScores] = useState<AssessmentScores | null>(null);

  useEffect(() => {
    calculateScores();
  }, []);

  const calculateScores = () => {
    const psychometricAnswers = JSON.parse(localStorage.getItem('psychometricAnswers') || '{}');
    const technicalAnswers = JSON.parse(localStorage.getItem('technicalAnswers') || '{}');
    const wiscarAnswers = JSON.parse(localStorage.getItem('wiscarAnswers') || '{}');

    // Calculate psychometric score (average of all answers)
    const psychometricValues = Object.values(psychometricAnswers).map(Number);
    const psychometricScore = Math.round((psychometricValues.reduce((a, b) => a + b, 0) / psychometricValues.length) * 20);

    // Calculate technical score (simple scoring based on correct answers)
    const correctAnswers = ['A', 'C', 'C', 'C', 'A', 'B']; // Correct answers for technical questions
    let technicalCorrect = 0;
    Object.entries(technicalAnswers).forEach(([index, answer]) => {
      if (answer === correctAnswers[parseInt(index)]) {
        technicalCorrect++;
      }
    });
    const technicalScore = Math.round((technicalCorrect / correctAnswers.length) * 100);

    // Calculate WISCAR scores
    const wiscarValues = Object.values(wiscarAnswers).map(Number);
    const wiscarScores = {
      will: wiscarValues[0] * 20,
      interest: wiscarValues[1] * 20,
      skill: wiscarValues[2] * 20,
      cognitive: wiscarValues[3] * 20,
      ability: wiscarValues[4] * 20,
      realWorld: wiscarValues[5] * 20
    };

    // Calculate overall score
    const overallScore = Math.round(
      (psychometricScore * 0.3 + technicalScore * 0.3 + 
       (Object.values(wiscarScores).reduce((a, b) => a + b, 0) / 6) * 0.4)
    );

    // Determine recommendation
    let recommendation: "YES" | "MAYBE" | "NO";
    if (overallScore >= 75) {
      recommendation = "YES";
    } else if (overallScore >= 55) {
      recommendation = "MAYBE";
    } else {
      recommendation = "NO";
    }

    setScores({
      psychometricScore,
      technicalScore,
      wiscarScores,
      overallScore,
      recommendation
    });
  };

  const getRecommendationMessage = (recommendation: string, overallScore: number) => {
    switch (recommendation) {
      case "YES":
        return {
          icon: <CheckCircle className="h-6 w-6 text-success" />,
          title: "Strong Fit for BI Career",
          message: "You show excellent alignment with Business Intelligence roles. Your analytical mindset, technical aptitude, and personality traits suggest you would thrive in this field.",
          color: "text-success",
          bgColor: "bg-success/10"
        };
      case "MAYBE":
        return {
          icon: <AlertTriangle className="h-6 w-6 text-warning" />,
          title: "Promising Potential",
          message: "You have good potential for BI, but some areas need development. Focus on strengthening your technical skills and gaining more exposure to data analysis.",
          color: "text-warning",
          bgColor: "bg-warning/10"
        };
      case "NO":
        return {
          icon: <XCircle className="h-6 w-6 text-destructive" />,
          title: "Consider Alternative Paths",
          message: "While BI may not be the perfect fit, your skills might align better with related roles like business analysis, project coordination, or UX research.",
          color: "text-destructive",
          bgColor: "bg-destructive/10"
        };
      default:
        return {
          icon: <Target className="h-6 w-6" />,
          title: "Assessment Complete",
          message: "Thank you for completing the assessment.",
          color: "text-foreground",
          bgColor: "bg-muted/10"
        };
    }
  };

  const getWiscarIcon = (dimension: string) => {
    const icons = {
      will: <Target className="h-5 w-5 text-success" />,
      interest: <Heart className="h-5 w-5 text-destructive" />,
      skill: <Zap className="h-5 w-5 text-warning" />,
      cognitive: <Brain className="h-5 w-5 text-primary" />,
      ability: <BookOpen className="h-5 w-5 text-info" />,
      realWorld: <Globe className="h-5 w-5 text-accent" />
    };
    return icons[dimension as keyof typeof icons];
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  if (!scores) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Calculating your results...</p>
        </div>
      </div>
    );
  }

  const recommendation = getRecommendationMessage(scores.recommendation, scores.overallScore);

  return (
    <div className="min-h-screen bg-background">
      <ProgressIndicator currentStep={4} totalSteps={4} />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Your BI Career Assessment Results</h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive analysis of your fit for Business Intelligence roles
          </p>
        </div>

        {/* Overall Score */}
        <Card className={`mb-8 border-2 ${recommendation.bgColor}`}>
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {recommendation.icon}
            </div>
            <CardTitle className={`text-2xl ${recommendation.color}`}>
              {recommendation.title}
            </CardTitle>
            <div className="text-6xl font-bold text-primary mt-4">
              {scores.overallScore}
              <span className="text-2xl text-muted-foreground">/100</span>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground leading-relaxed">
              {recommendation.message}
            </p>
          </CardContent>
        </Card>

        {/* Section Scores */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-primary" />
                Psychometric Fit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                <span className={getScoreColor(scores.psychometricScore)}>
                  {scores.psychometricScore}
                </span>
                <span className="text-lg text-muted-foreground">/100</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Personality, interests, and motivational alignment
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-warning" />
                Technical Readiness
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">
                <span className={getScoreColor(scores.technicalScore)}>
                  {scores.technicalScore}
                </span>
                <span className="text-lg text-muted-foreground">/100</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Current technical knowledge and aptitude
              </p>
            </CardContent>
          </Card>
        </div>

        {/* WISCAR Breakdown */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>WISCAR Framework Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {Object.entries(scores.wiscarScores).map(([dimension, score]) => (
                <div key={dimension} className="text-center p-4 border rounded-lg">
                  <div className="flex justify-center mb-2">
                    {getWiscarIcon(dimension)}
                  </div>
                  <div className="text-lg font-semibold capitalize mb-1">
                    {dimension === 'realWorld' ? 'Real World' : dimension}
                  </div>
                  <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
                    {score}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-accent" />
              Recommended Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            {scores.recommendation === "YES" && (
              <div className="space-y-4">
                <h4 className="font-semibold text-success">Ready to Start Your BI Journey</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Begin with Excel fundamentals and advanced functions</li>
                  <li>• Learn SQL basics (SELECT, JOIN, GROUP BY)</li>
                  <li>• Start with Power BI or Tableau tutorials</li>
                  <li>• Practice with real datasets and create sample dashboards</li>
                  <li>• Consider BI certification programs</li>
                </ul>
              </div>
            )}
            {scores.recommendation === "MAYBE" && (
              <div className="space-y-4">
                <h4 className="font-semibold text-warning">Focus Areas for Improvement</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Strengthen Excel skills with pivot tables and formulas</li>
                  <li>• Take an introductory SQL course</li>
                  <li>• Practice analytical thinking with data puzzles</li>
                  <li>• Explore BI tools through free online tutorials</li>
                  <li>• Consider a data analysis bootcamp</li>
                </ul>
              </div>
            )}
            {scores.recommendation === "NO" && (
              <div className="space-y-4">
                <h4 className="font-semibold text-destructive">Alternative Career Paths</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Business Analyst (less technical focus)</li>
                  <li>• UX Research (user-focused analytics)</li>
                  <li>• Marketing Analytics (creative + analytical)</li>
                  <li>• Project Coordination (organizational skills)</li>
                  <li>• Quality Assurance (detail-oriented testing)</li>
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate("/")}
            variant="outline"
            className="flex items-center"
          >
            <Home className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          <Button
            onClick={() => window.print()}
            className="flex items-center"
          >
            <Download className="mr-2 h-4 w-4" />
            Save Results
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;