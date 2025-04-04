import { getData, deleteData, crateData } from "@/sever/action";  // Import the getData function
import SubmitBtn from "@/components/form-button";  // Correct import
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default async function dashboard() {
  const data = await getData();  // Fetch data using getData

  return (
    <div>
      <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form action={crateData}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input type="text" className="form-control" required name="name" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email address</label>
                  <input type="email" name="email" className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Age</label>
                  <input type="number" name="age" className="form-control" required />
                </div>
                <SubmitBtn/>
              </form>
            </div>
          </div>
        </div>
        
        
        


      </div>
      <div className="row mt-5">
      <Button>Button</Button>
      <AlertDialog>
  <AlertDialogTrigger>Open</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
        <div className="col-4 offset-md-4">
          <h5 className="">
            Page
            <button type="button"  className="btn btn-sm  btn-primary float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Add
            </button>
          </h5>
        </div>
        <div className="col-4 offset-md-4">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Status</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((dt: any, index: number) => {
                return (
                  <tr key={index}>
                    <td>{dt.name}</td>
                    <td>{dt.age}</td>
                    <td>{dt.status}</td>
                    <td>{dt.email}</td>
                    <td>
                      <form action={deleteData}>
                        <input readOnly hidden name="id" value={dt.id} />
                        <button className="btn btn-sm border">Del</button>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
