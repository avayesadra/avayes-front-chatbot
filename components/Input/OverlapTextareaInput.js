const OverlapTextareaInput = ({ label, name, register }) => {
  return (
    <div className="relative z-0 w-full mb-5">
      <textarea
        name={name}
        cols="10"
        rows="3"
        placeholder=" "
        {...(register ? register(name) : {})} // Conditionally apply register function
        className="pt-3 pb-2 block w-full px-4 mt-0 border-1 appearance-none focus:outline-none focus:ring-0 focus:border-black border-gray-200"
      />

      <label
        for={name}
        className="absolute duration-300 top-3 -z-1 origin-0 text-gray-500"
      >
        {label}
      </label>

      <span className="text-sm text-red-600 hidden" id="error">
        Name is required
      </span>
    </div>
  );
};

export default OverlapTextareaInput;
