import { Button, Spinner } from "flowbite-react";

export const LoadMore = ({
  disabled,
  onClick,
  loading,
}: {
  disabled: boolean;
  onClick: () => void;
  loading: boolean;
}) => (
  <div className="flex justify-center">
    <Button className="w-64" color="gray" onClick={onClick} disabled={disabled}>
      {loading ? (
        <>
          <Spinner size="sm" className="mr-3" light={true} />
          Loading...
        </>
      ) : (
        <>Load more</>
      )}
    </Button>
  </div>
);
