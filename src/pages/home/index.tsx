import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex items-start gap-4">
          <div className="h-12 w-12 flex-shrink-0 items-start rounded-full bg-gray-300"></div>
          <div className="flex-grow">
            <div className="mb-1 flex items-center gap-1">
              <div className="font-bold">Elon Musk</div>
              <div className="text-sm text-gray-400">@elonmusk · 2 小时</div>
            </div>
            <div className="mb-2 text-sm">
              太阳当空照，花儿对我笑，太阳当空照，花儿对我笑，太阳当空照，花儿对我笑，太阳当空照，花儿对我笑
            </div>
            <div className="mb-1 flex h-64 w-full rounded-md bg-gray-300"></div>
            <div className="flex items-center gap-4 text-sm">
              <div>✉️ 评论</div>
              <div>🚀 转发</div>
              <div>👍 收藏</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Login;
