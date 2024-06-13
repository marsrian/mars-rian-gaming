const AddressInputs = ({ addressProps, setAddressProps }) => {
  const { phone, streetAddress, postalCode, city, country } = addressProps;
  return (
    <>
      <div className="flex flex-col mb-2">
        <label className="text-white">Phone</label>
        <input
          type="tel"
          id=""
          name=""
          placeholder="Phone number"
          value={phone}
          onChange={(ev) => setAddressProps("phone", ev.target.value)}
          className="border p-2 rounded-md"
        />
      </div>
      <div className="flex flex-col mb-2">
        <label className="text-white">Street address</label>
        <input
          type="text"
          id=""
          name=""
          placeholder="Street address"
          value={streetAddress}
          onChange={(ev) => setAddressProps("streetAddress", ev.target.value)}
          className="border p-2 rounded-md"
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-2">
        <div className="flex flex-col">
          <label className="text-white">City</label>
          <input
            type="text"
            id=""
            name=""
            placeholder="City"
            value={city}
            onChange={(ev) => setAddressProps("city", ev.target.value)}
            className="border p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-white">Postal code</label>
          <input
            type="text"
            id=""
            name=""
            placeholder="Postal code"
            value={postalCode}
            onChange={(ev) => setAddressProps("postalCode", ev.target.value)}
            className="border p-2 rounded-md"
          />
        </div>
      </div>
      <div className="flex flex-col mb-3">
        <label className="text-white">Country</label>
        <input
          type="text"
          id=""
          name=""
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
