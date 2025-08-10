import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Code, Database, BarChart3 } from "lucide-react";
import { ProgressIndicator } from "@/components/assessment/ProgressIndicator";

const Technical = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = [
    {
      category: "Logical Reasoning",
      icon: <Code className="h-5 w-5" />,
      question: "If Sales increased 15% and Costs increased 8%, what happened to profit margin?",
      options: [
        { value: "A", label: "Profit margin increased" },
        { value: "B", label: "Profit margin decreased" },
        { value: "C", label: "Profit margin stayed the same" },
        { value: "D", label: "Cannot determine without absolute values" }
      ]
    },
    {
      category: "Excel Knowledge",
      icon: <BarChart3 className="h-5 w-5" />,
      question: "Which Excel function would you use to find the average of values that meet multiple criteria?",
      options: [
        { value: "A", label: "AVERAGE" },
        { value: "B", label: "AVERAGEIF" },
        { value: "C", label: "AVERAGEIFS" },
        { value: "D", label: "SUMPRODUCT" }
      ]
    },
    {
      category: "SQL Basics",
      icon: <Database className="h-5 w-5" />,
      question: "Which SQL clause would you use to group data and calculate aggregates?",
      options: [
        { value: "A", label: "WHERE" },
        { value: "B", label: "ORDER BY" },
        { value: "C", label: "GROUP BY" },
        { value: "D", label: "HAVING" }
      ]
    },
    {
      category: "Data Visualization",
      icon: <BarChart3 className="h-5 w-5" />,
      question: "Which chart type is best for showing the relationship between two continuous variables?",
      options: [
        { value: "A", label: "Bar chart" },
        { value: "B", label: "Pie chart" },
        { value: "C", label: "Scatter plot" },
        { value: "D", label: "Line chart" }
      ]
    },
    {
      category: "BI Concepts",
      icon: <BarChart3 className="h-5 w-5" />,
      question: "What is a KPI in business intelligence?",
      options: [
        { value: "A", label: "Key Performance Indicator - a metric that measures success" },
        { value: "B", label: "Knowledge Processing Interface - a data entry system" },
        { value: "C", label: "Kernel Performance Index - a system metric" },
        { value: "D", label: "Key Process Identifier - a workflow tracker" }
      ]
    },
    {
      category: "Data Analysis",
      icon: <Code className="h-5 w-5" />,
      question: "A dataset shows customer satisfaction scores of 4.2, 3.8, 4.5, 3.9, 4.1. What is the median?",
      options: [
        { value: "A", label: "4.0" },
        { value: "B", label: "4.1" },
        { value: "C", label: "4.2" },
        { value: "D", label: "4.3" }
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
      // Store technical data in localStorage
      localStorage.setItem('technicalAnswers', JSON.stringify(answers));
      navigate("/assessment/wiscar");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      navigate("/assessment/psychometric");
    }
  };

  const isAnswered = answers[currentQuestion] !== undefined;
  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-background">
      <ProgressIndicator currentStep={2} totalSteps={4} />
      
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Technical Assessment</h1>
          <p className="text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center text-sm text-accent font-medium mb-2">
              {question.icon}
              <span className="ml-2">{question.category}</span>
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
                    <span className="font-medium mr-2">{option.value}.</span>
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
            {currentQuestion === questions.length - 1 ? "Continue to WISCAR" : "Next"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Technical;