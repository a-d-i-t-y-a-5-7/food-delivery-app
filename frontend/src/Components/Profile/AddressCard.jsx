import React from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const AddressCard = ({
  address,
  selectedAddressId,
  onUpdate,
  onDelete,
  onSelect,
}) => {
  return (
    <div
      className="card w-50 shadow-sm"
      // style={{
      //   width: "100%",
      //   maxWidth: "450px",
      //   margin: "auto",
      //   background: "white",
      //   color: "black",
      // }}
    >
      <div className="card-header bg-transparent d-flex justify-content-between align-items-center">
        <span>
          {address.city}, {address.state}
        </span>
        <input
          type="radio"
          name="deliveryAddress"
          checked={selectedAddressId === address.id}
          onChange={() => onSelect(address.id)}
          className="form-check-input"
        />
      </div>
      <div className="card-body">
        <p>
          <strong>Street:</strong> {address.addressLine1},{" "}
          {address.addressLine2}
        </p>
        <p>
          <strong>Zip Code:</strong> {address.zipCode}
        </p>
        <p>
          <strong>Country:</strong> {address.country}
        </p>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-outline-success mx-2"
            onClick={() => onUpdate(address)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            <EditOutlined />
          </button>
          <button
            className="btn btn-outline-danger mx-2"
            onClick={() => onDelete(address.id)}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            <DeleteOutlined />
          </button>
        </div>
      </div>
    </div>
  );
};
