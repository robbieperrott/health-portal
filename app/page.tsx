import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {

  return (
    <Card className="max-w-sm h-fit">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">Welcome to your health portal</CardTitle>
      </CardHeader>
      <CardContent>
        Click on one of the links in the navigation menu above to explore your data or chat to our AI assistant.
      </CardContent>
    </Card>
  );
}
