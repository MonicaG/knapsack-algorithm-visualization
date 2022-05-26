import React from 'react';
import { SolutionItemsPropType } from './helpers/PropTypesHelper'
import ControlButtons from './ControlButtons';
import ReactEmbedGist from 'react-embed-gist';

function SolutionItems({ solutionItems }) {
  const solutionItemsToUse = solutionItems.filter(x => x.inSolution)
  return (
    <div>
      <ControlButtons />
      <div className="explanation">
        <p>The algorithm has completed. The following items fit in the knapsack and provide the greatest value:</p>
        {solutionItemsToUse.length > 0 ?
          <ul className="list-disc ml-8">
            {solutionItemsToUse.map(element => {
              return <li key={element.item.name} aria-label='solution item'>{element.item.name}</li>
            })}
          </ul>
          :
          <p>No items fit in the knapsack.</p>
        }
        <h3 className="title">Complete Algorithm</h3>
        <ReactEmbedGist gist="MonicaG/080c68d98f78c199552a00bdb5580ca2"/>
        <h3 className="title">Resources</h3>
        <p>The following helped me understand the knapsack problem:</p>
        <ul className="list-disc ml-8">
          <li><a className="link" href="https://www.manning.com/books/classic-computer-science-problems-in-swift">Classic Computer Science Problems in Swift</a></li>
          <li><a className="link" href="https://cse.unl.edu/~goddard/Courses/CSCE310J/Lectures/Lecture8-DynamicProgramming.pdf">CSCE 310J: Data Structures & Algorithms Lecture Notes</a></li>
          <li><a className="link" href="http://www.or.deis.unibo.it/kp/Chapter1.pdf">"KNAPSACK PROBLEMS - Algorithms and Computer Implementations by Silvano Martello and Paolo Toth"</a></li>
          <li><a className="link" href="https://en.wikipedia.org/wiki/Knapsack_problem">Wikipedia - Knapsack problem</a></li>
          <li><a className="link" href="https://rosettacode.org/wiki/Knapsack_problem/0-1">rosettacode - Knapsack problem/0-1</a></li>
        </ul>
      </div>
    </div>
  );
};

SolutionItems.propTypes = {
  solutionItems: SolutionItemsPropType.isRequired
};

export default SolutionItems;