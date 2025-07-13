import { Handle, Position } from '@xyflow/react';
import Link from 'next/link';
import React from 'react';

function TurboNode({ data }: any) {
  return (
    <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-100 to-blue-200 shadow-lg w-64 p-5 transition-all duration-300 hover:shadow-2xl hover:border-blue-500">
      <div className="font-bold text-lg text-gray-800">{data.title}</div>
      <p className="text-sm text-gray-700 mt-1">{data.description}</p>

      {data?.link ? (
        <Link
          href={data.link}
          target="_blank"
          className="text-blue-700 hover:text-blue-900 underline text-sm mt-3 inline-block transition"
        >
          Learn More →
        </Link>
      ) : (
        <span className="text-gray-400 italic text-sm mt-3 inline-block">
          No link available
        </span>
      )}

      {/* Flow handles */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default TurboNode;
