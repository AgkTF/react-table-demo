import {
  ArrowUturnRightIcon,
  DocumentDuplicateIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';

export default function ActionsCell() {
  return (
    <div className="w-full flex items-center justify-center gap-2">
      <button type="button" className="h-5 w-5 text-[#2f256a]">
        <ArrowUturnRightIcon className="h-full w-full" />
      </button>

      <button type="button" className="h-5 w-5 text-[#2f256a]">
        <DocumentDuplicateIcon className="h-full w-full" />
      </button>

      <button type="button" className="h-5 w-5 text-red-600">
        <TrashIcon className="h-full w-full" />
      </button>
    </div>
  );
}
