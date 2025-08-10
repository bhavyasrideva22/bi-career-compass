import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Target, Heart, Zap, Brain, BookOpen, Globe } from "lucide-react";
import { ProgressIndicator } from "@/components/assessment/ProgressIndicator";

const WISCAR = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = [
    {
      dimension: "Will",
      icon: <Target className="h-5 w-5 text-success" />,
      question: "How committed are you to pursuing a career change to BI, even if it requires months of learning?",
      options: [
        { value: "1", label: "Not committed at all" },
        { value: "2", label: "Somewhat committed" },
        { value: "3", label: "Moderately committed" },
        { value: "4", label: "Very committed" },
        { value: "5", label: "Extremely committed" }
      ]
    },
    {
      dimension: "Interest",
      icon: <Heart className="h-5 w-5 text-destructive" />,
      question: "How excited do you feel about working with data to solve business problems?",
      options: [
        { value: "1", label: "Not excited at all" },
        { value: "2", label: "Slightly excited" },
        { value: "3", label: "Moderately excited" },
        { value: "4", label: "Very excited" },
        { value: "5", label: "Extremely excited" }
      ]
    },
    {
      dimension: "Skill",
      icon: <Zap className="h-5 w-5 text-warning" />,
      question: "How would you rate your current technical skills relevant to BI (Excel, basic SQL, data analysis)?",
      options: [
        { value: "1", label: "Beginner - minimal experience" },
        { value: "2", label: "Novice - some basic knowledge" },
        { value: "3", label: "Intermediate - comfortable with basics" },
        { value: "4", label: "Advanced - strong technical skills" },
        { value: "5", label: "Expert - extensive experience" }
      ]
    },
    {
      dimension: "Cognitive Readiness",
      icon: <Brain className="h-5 w-5 text-primary" />,
      question: "How comfortable are you with abstract thinking and complex problem-solving?",
      options: [
        { value: "1", label: "Very uncomfortable" },
        { value: "2", label: "Somewhat uncomfortable" },
        { value: "3", label: "Neutral" },
        { value: "4", label: "Comfortable" },
        { value: "5", label: "Very comfortable" }
      ]
    },
    {
      dimension: "Ability to Learn",
      icon: <BookOpen className="h-5 w-5 text-info" />,
      question: "How do you typically respond to feedback and challenging learning situations?",
      options: [
        { value: "1", label: "I find it discouraging and tend to give up" },
        { value: "2", label: "I struggle but sometimes push through" },
        { value: "3", label: "I accept it but don't always act on it" },
        { value: "4", label: "I welcome it and use it to improve" },
        { value: "5", label: "I actively seek it out and thrive on challenges" }
      ]
    },
    {
      dimension: "Real-World Alignment",
      icon: <Globe className="h-5 w-5 text-accent" />,
      question: "How well do typical BI work scenarios (creating dashboards, analyzing trends, presenting insights) align with your ideal work environment?",
      options: [
        { value: "1", label: "Not aligned at all" },
        { value: "2", label: "Slightly aligned" },
        { value: "3", label: "Moderately aligned" },
        { value: "4", label: "Well aligned" },
        { value: "5", label: "Perfectly aligned" }
      ]
    }
  ];

  const handleAnswerChange = (value: string) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Store WISCAR data in localStorage
      localStorage.setItem('wiscarAnswers', JSON.stringify(answers));
      navigate("/assessment/results");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      navigate("/assessment/technical");
    }
  };

  const isAnswered = answers[currentQuestion] !== undefined;
  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-background">
      <ProgressIndicator currentStep={3} totalSteps={4} />
      
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">WISCAR Framework Assessment</h1>
          <p className="text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length} - {question.dimension} Dimension
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center text-sm font-medium mb-2">
              {question.icon}
              <span className="ml-2">{question.dimension}</span>
            </div>
            <CardTitle className="text-xl leading-relaxed">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[currentQuestion] || ""}
              onValueChange={handleAnswerChange}
              className="space-y-4"
            >
              {question.options.map((option) => (
                <div key={option.value} className="flex items-start space-x-3">
                  <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                  <Label 
                    htmlFor={option.value}
                    className="flex-1 cursor-pointer py-2 leading-relaxed"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            className="flex items-center"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <div className="text-sm text-muted-foreground">
            {currentQuestion + 1} / {questions.length}
          </div>

          <Button
            onClick={handleNext}
            disabled={!isAnswered}
            className="flex items-center"
          >
            {currentQuestion === questions.length - 1 ? "View Results" : "Next"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WISCAR;