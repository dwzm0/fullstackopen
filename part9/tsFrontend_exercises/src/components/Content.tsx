import { CoursePart } from '../types';

const Part = ({part} : {part: CoursePart}) => (
    <>
    <p><strong>{part.name} {part.exerciseCount}</strong></p>
    {(() => {
      switch (part.kind) {
        case 'basic':
          return <p><em>{part.description}</em></p>
        case 'group':
          return <p>project exercises {part.groupProjectCount}</p>
        case 'background':
          return <p>{part.description} {part.backgroundMaterial}</p>
        case 'special':
          return  (
          <>
            <p>{part.description}</p>
            Requirements: {part.requirements.map((req) => (
              <span key={req}><strong>{req}</strong> </span>
            ))}
          </>
          )
      }
    })()}
    </>
)

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => (
    <>
     {courseParts.map((part) => (
      <Part key={part.name} part={part} />
    ))}
    </>
  );

export default Content;

