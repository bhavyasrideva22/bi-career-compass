import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProgressIndicator } from "@/components/assessment/ProgressIndicator";

const Psychometric = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  const questions = [
    {
      category: "Interest Scale (Holland Code)",
      question: "I enjoy working with spreadsheets and structured data.",
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "3", label: "Neutral" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      category: "Interest Scale (Holland Code)",
      question: "I prefer analyzing patterns and trends rather than creative tasks.",
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "3", label: "Neutral" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      category: "Personality (Big 5)",
      question: "I pay attention to details and rarely make careless mistakes.",
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "3", label: "Neutral" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      category: "Grit & Mindset",
      question: "I continue working on challenging problems even when progress is slow.",
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "3", label: "Neutral" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      category: "Working Preferences",
      question: "I prefer structured, well-defined tasks over open-ended projects.",
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "3", label: "Neutral" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
      ]
    },
    {
      category: "Motivation",
      question: "Learning new skills and solving complex problems motivates me more than external rewards.",
      options: [
        { value: "1", label: "Strongly Disagree" },
        { value: "2", label: "Disagree" },
        { value: "3", label: "Neutral" },
        { value: "4", label: "Agree" },
        { value: "5", label: "Strongly Agree" }
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
      // Store psychometric data in localStorage
      localStorage.setItem('psychometricAnswers', JSON.stringify(answers));
      navigate("/assessment/technical");
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      navigate("/assessment/intro");
    }
  };

  const isAnswered = answers[currentQuestion] !== undefined;
  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-background">
      <ProgressIndicator currentStep={1} totalSteps={4} />
      
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Psychometric Assessment</h1>
          <p className="text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="text-sm text-primary font-medium mb-2">
              {question.category}
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
                <div key={option.value} className="flex items-center space-x-3">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label 
                    htmlFor={option.value}
                    className="flex-1 cursor-pointer py-2"
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
            {currentQuestion === questions.length - 1 ? "Continue to Technical" : "Next"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Psychometric;