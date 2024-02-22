import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";

import { GetWebsiteDetailAPI } from "@/api/getWebsiteDetail";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useWebsiteDetail } from "./query";

const updateWebsiteSchema = z.object({
  name: z.string().min(1),
  url: z.string().url(),
});

type UpdateWebsiteFormValues = z.infer<typeof updateWebsiteSchema>;
type WebsiteActionMenuProps = {
  id: string;
};

export const WebsiteActionMenu = ({ id }: WebsiteActionMenuProps) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <DotsHorizontalIcon className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              setIsEditDialogOpen((prev) => !prev);
            }}
          >
            Edit
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isEditDialogOpen && (
        <EditWebsiteDialog id={id} onOpenChange={setIsEditDialogOpen} />
      )}
    </>
  );
};

type EditWebsiteDialogProps = {
  id: string;
  onOpenChange: (isOpen: boolean) => void;
};

const EditWebsiteDialog = ({ id, onOpenChange }: EditWebsiteDialogProps) => {
  const { data: webDetail, isFetching, isError } = useWebsiteDetail({ id });

  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Website Information</DialogTitle>
          <DialogDescription>
            {"Make changes to website here. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        {isFetching && <div>Loading...</div>}
        {isError && <div>Failed to load website detail</div>}
        {webDetail && <EditForm webDetail={webDetail} />}
      </DialogContent>
    </Dialog>
  );
};

type EditFormProps = {
  webDetail: GetWebsiteDetailAPI["responses"]["200"]["content"]["application/json"];
};

const EditForm = ({ webDetail }: EditFormProps) => {
  const { website_url, website_name } = webDetail;

  const editForm = useForm<UpdateWebsiteFormValues>({
    resolver: zodResolver(updateWebsiteSchema),
    defaultValues: {
      name: website_name,
      url: website_url,
    },
  });

  const onSubmit = (values: UpdateWebsiteFormValues) => {
    console.log(values);
  };

  return (
    <Form {...editForm}>
      <form
        onSubmit={(e) => void editForm.handleSubmit(onSubmit)(e)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={editForm.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel htmlFor="name">Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <FormField
          control={editForm.control}
          name="url"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel htmlFor="url">Url</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            );
          }}
        />
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};
