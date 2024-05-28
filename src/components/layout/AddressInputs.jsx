const AddressInputs = ({ addressProps, setAddressProps }) => {
  const { phone, streetAddress, postalCode, city, country } = addressProps;
  return (
    <>
      <div className="flex flex-col mb-2">
        <label>Phone</label>
        <input
          type="tel"
          placeholder="Phone number"
          value={phone}
          onChange={(ev) => setAddressProps("phone", ev.target.value)}
          className="border p-2 rounded-md"
        />
      </div>
      <div className="flex flex-col mb-2">
        <label>Street address</label>
        <input
          type="text"
          placeholder="Street address"
          value={streetAddress}
          onChange={(ev) => setAddressProps("streetAddress", ev.target.value)}
          className="border p-2 rounded-md"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div className="flex flex-col">
          <label>City</label>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(ev) => setAddressProps("city", ev.target.value)}
            className="border p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label>Postal code</label>
          <input
            type="text"
            placeholder="Postal code"
            value={postalCode}
            onChange={(ev) => setAddressProps("postalCode", ev.target.value)}
            className="border p-2 rounded-md"
          />
        </div>
      </div>
      <div className="flex flex-col mb-3">
        <label>Country</label>
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(ev) => setAddressProps("country", ev.target.value)}
          className="border p-2 rounded-md"
        />
      </div>
    </>
  );
};

export default AddressInputs;
