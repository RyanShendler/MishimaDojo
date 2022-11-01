import { ResponsiveRadar } from "@nivo/radar";

const ArchetypeChart = ({
  poke,
  keepout,
  mixup,
  pressure,
  defense,
  whiffPunish,
}) => {
  return (
    <div className="relative flex w-[88%] flex-col items-center">
      <h3 className="absolute top-1 w-full text-center text-xl font-bold">
        Archetype
      </h3>
      <div className="aspect-square w-full">
        <ResponsiveRadar
          data={[
            { archetype: "Poke", Rating: poke },
            { archetype: "Keepout", Rating: keepout },
            { archetype: "Mixup", Rating: mixup },
            { archetype: "Pressure", Rating: pressure },
            { archetype: "Defense", Rating: defense },
            { archetype: "Whiff Punish", Rating: whiffPunish },
          ]}
          margin={{ top: 0, bottom: 0, left: 70, right: 50 }}
          colors={{ scheme: "category10" }}
          maxValue={5}
          keys={["Rating"]}
          indexBy={"archetype"}
        />
      </div>
    </div>
  );
};

export default ArchetypeChart;
