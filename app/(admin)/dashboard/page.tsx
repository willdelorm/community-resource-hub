import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// TODO: Import and hydrate data once db is set up
const Dashboard = async () => {
  const organizations = []; // await getAllDocumentsFromCollection("organizations");
  const announcements = []; // await getAllDocumentsFromCollection("announcements");
  const events = []; // await getAllDocumentsFromCollection("events")).slice(0, 5);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-black uppercase tracking-wide text-slate-800">
          Dashboard
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage site content below.
        </p>
      </div>

      <hr className="border-slate-300" />

      <Card>
        <CardHeader>
          <CardTitle>Resources</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <PreviewTable category="resources" data={organizations} /> */}
        </CardContent>
        <CardFooter className="flex justify-between">
          <a href="/dashboard/resources/add">
            <Button>New</Button>
          </a>
          <a href="/dashboard/resources">View All</a>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Announcements</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <PreviewTable category="announcements" data={announcements} /> */}
        </CardContent>
        <CardFooter className="flex justify-between">
          <a href="/dashboard/announcements/add">
            <Button>New</Button>
          </a>
          <a href="/dashboard/announcements">View All</a>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Events</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <PreviewTable category="events" data={events} /> */}
        </CardContent>
        <CardFooter className="flex justify-between">
          <a href="/dashboard/events/add">
            <Button>New</Button>
          </a>
          <a href="/dashboard/events">View All</a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;
