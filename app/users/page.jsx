"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import UserCard from "../components/UserCard";

// Function to fetch user data with pagination

const fetchUserData = async ({ pageParam = 0 }) => {
  const res = await axios.get(
    `https://tech-test.raintor.com/api/users/GetUsersList?take=5&skip=${pageParam}`
  );
  return res.data;
};

const Page = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: fetchUserData,
    getNextPageParam: (lastPage, pages) => {
      const loaded = pages.length * 5;
      return loaded < lastPage.total ? loaded : undefined;
    },
  });

  // Intersection Observer for infinite scrolling
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  // Loading and error states
  if (isLoading)
    return (
      <div className="flex justify-center items-center py-20 h-[94vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-base"></div>
      </div>
    );
  if (isError)
    return (
      <div className="flex justify-center items-center py-20 h-[94vh]">
        <p className="text-center mt-20 text-red-600">Error: {error.message}</p>
      </div>
    );

  return (
    <div className="container mx-auto py-20 flex flex-col gap-16 items-center">
      <h1 className="text-center text-4xl font-bold">
        You Can See All the Users Here:
      </h1>

      {/* Render paginated user list */}
      <div className="w-full flex flex-col items-center gap-6">
        {data.pages.map((page, i) => (
          <React.Fragment key={i}>
            {page.users.map((user) => (
              <UserCard key={user.id} data={user} />
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Infinite Scroll Loader */}
      <div ref={ref} className="mt-8 text-gray-600">
        {isFetchingNextPage ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-base"></div>
          </div>
        ) : (
          "Scroll down to load more"
        )}
      </div>
    </div>
  );
};

export default Page;
