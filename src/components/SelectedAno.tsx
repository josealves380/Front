export function SelectedAno() {
  return (
    <div className="flex justify-center">
      <div className="mb-3">
        <select
          className="form-select 
        block
        w-32
        px-3
        py-1.5
        text-base
        font-normal
       text-cyan-600
        bg-white bg-clip-padding bg-no-repeat
        border border-solid border-cyan-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          aria-label="Selected"
        >
          <option defaultValue="0" selected>
            Ano
          </option>
          <option defaultValue="1">2023</option>
          <option defaultValue="2">2024</option>
          <option defaultValue="3">2025</option>
          <option defaultValue="4">2026</option>
          <option defaultValue="5">2027</option>
          <option defaultValue="6">2028</option>
          <option defaultValue="7">2029</option>
          <option defaultValue="8">2030</option>
          <option defaultValue="9">2031</option>
          <option defaultValue="10">2032</option>
          <option defaultValue="11">2033</option>
          <option defaultValue="12">2034</option>
        </select>
      </div>
    </div>
  );
}
