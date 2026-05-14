import PlanTripClient from "./PlanTripCleint";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PlanTripPage({ params }: Props) {
  const { id } = await params;

  console.log("server id", id);
  

  return (
    <>
      <PlanTripClient tripId={id} />
    </>
  );
}
