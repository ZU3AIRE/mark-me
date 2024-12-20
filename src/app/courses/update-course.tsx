import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ICourse } from "../model/course";
import { formSchema } from "./add-course";

const updateCourse = (course: any, courseId: number) => {
  var data: ICourse[] =
    JSON.parse(window.localStorage.getItem("courses") || "[]") || [];
  var foundCrs = data.find((crs) => crs.id === courseId);
  var foundCrsIndex = data.findIndex((crs) => crs.id === courseId);

  if (foundCrs) {
    foundCrs.courseCode = course.courseCode;
    foundCrs.title = course.title;
    foundCrs.teacher = course.teacher;
  }
  if (foundCrsIndex !== -1 && foundCrs) {
    data[foundCrsIndex] = foundCrs;
    window.localStorage.setItem("courses", JSON.stringify(data));
  }
};

export function UpdateCourse({
  courseId,
  onSave,
}: {
  courseId: number;
  onSave: () => void;
}) {
  var data: ICourse[] =
    JSON.parse(window.localStorage.getItem("courses") || "[]") || [];
  var crs = data.find((crs) => crs.id === courseId);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: crs,
  });

  function onSubmit(values: any) {
    updateCourse(values, courseId);
    onSave();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Title</FormLabel>
              <FormControl>
                <Input
                  type="title"
                  placeholder="Data Structures & Algorithms"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Complete name of the course without course code.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="courseCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Code</FormLabel>
              <FormControl>
                <Input type="text" placeholder="DC-323" {...field} />
              </FormControl>
              <FormDescription>The course code for the course.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="teacher"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Professor Assigned</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Arham Irfan" {...field} />
              </FormControl>
              <FormDescription>
                The professor who will be teaching the course.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
