import { CellContext } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { Tract } from '../../types';

type Props = {
  info: CellContext<Tract, any>;
};

export function EditableInputField({ info }: Props) {
  const initialValue = info.getValue();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue, setValue]);

  /**
   * there's a missing step here which is
   * updating the data passed to the table.
   * I'm not worried about it, though.
   * since handling it will be done using
   * our dataStore
   */

  return (
    <input
      type="text"
      spellCheck="false"
      value={value}
      className="p-0 bg-inherit text-inherit text-[14px] border border-x-0 border-t-0 border-dashed border-b-[#9b9b9b] truncate w-full"
      onChange={e => setValue(e.target.value)}
    />
  );
}
