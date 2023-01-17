import React, { useEffect, useState } from "react";
import AxiosApi from "../../../Api/AxiosApi";

function CustomerDetails({ close, address, user_id }) {
  const [user, setUser] = useState();

  useEffect(() => {
    AxiosApi.get("userdetails/" + user_id).then((res) => setUser(res.data));
  }, [user_id]);

  return (
    <div className="auth">
      <div className="login">
        <h3>Customer Details</h3>
        {user && (
          <table>
            <tbody>
              <tr>
                <td>Name: </td>
                <td>
                  {user.first_name} {user.last_name}
                </td>
              </tr>
              <tr>
                <td>Mobile No: </td>
                <td>{user.mobileno}</td>
              </tr>
              <tr>
                <td>Email: </td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>Address: </td>
                <td>
                  <pre>{address}</pre>
                </td>
              </tr>
            </tbody>
          </table>
        )}
        <div className="login-text">
          <button
            onClick={() => {
              close(null);
            }}
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetails;
