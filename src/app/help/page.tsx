import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/src/components/ui/accordion";

export function generateMetadata() {
  return { title: "Help • IOwe" };
}

export default function HelpPage() {
  return (
    <section className="space-y-6">
      <div className="text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight">Help</h1>
        <p className="text-muted-foreground">
          Guides, FAQs, and ways to get support.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Frequently asked questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="what-is-groups">
              <AccordionTrigger>What are groups?</AccordionTrigger>
              <AccordionContent>
                Groups let you split expenses with friends, roommates, or
                project mates. Add expenses, track balances, and settle up.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="how-to-settle">
              <AccordionTrigger>How do I settle a balance?</AccordionTrigger>
              <AccordionContent>
                Go to <span className="font-medium">Balances</span>, choose a
                person you owe or who owes you, and click{" "}
                <span className="font-medium">Settle</span>. You can record cash
                or external payments.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="privacy">
              <AccordionTrigger>Who can see my data?</AccordionTrigger>
              <AccordionContent>
                Only members of your groups can see the related expenses and
                balances. You can leave a group anytime from the group page.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Contact support</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Can\'t find what you\'re looking for? We\'re here to help.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <a href="mailto:support@iowe.app">Email us</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/help/guide">Read the guide</a>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Community</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Share tips and get feedback from other users.
            </p>
            <Button asChild variant="secondary">
              <a href="#">Join the forum</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
