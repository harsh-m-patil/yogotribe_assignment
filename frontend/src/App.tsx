import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Cat } from "lucide-react";

interface CatFact {
  fact: string;
  length: number;
}

export default function App() {
  const [fact, setFact] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchRandomFact = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("https://catfact.ninja/fact");

      if (!response.ok) {
        throw new Error("Failed to fetch cat fact");
      }

      const data: CatFact = await response.json();
      setFact(data.fact);
    } catch (err) {
      setError(
        "Oops! Something went wrong while fetching the cat fact. Please try again.",
      );
      console.error("Error fetching cat fact:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Cat className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Random Cat Facts
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="text-center">
              <Button
                onClick={fetchRandomFact}
                disabled={isLoading}
                size="lg"
                className="px-8 py-3 text-lg font-semibold"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Getting Fact...
                  </>
                ) : (
                  "Get Random Cat Fact"
                )}
              </Button>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p className="text-red-700 dark:text-red-400 text-center">
                  {error}
                </p>
              </div>
            )}

            {fact && !error && (
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                  Did you know?
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                  {fact}
                </p>
              </div>
            )}

            {!fact && !error && !isLoading && (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400 text-lg">
                  Click the button above to discover an amazing cat fact!
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
