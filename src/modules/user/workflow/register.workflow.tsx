import {
  ClientGenderComponent,
  ClientHeightComponent,
  ClientWeightComponent,
  OnNext,
  EndComponent,
  CoachInfoComponent,
  StartComponent,
  AskForClientWorkflow,
} from '../components/RegisterWorkflowComponents';

type ReactTreeComponent = ({ onNext }: { onNext: OnNext }) => JSX.Element;

class TreeNode {
  component: ReactTreeComponent;
  children: TreeNode[];
  constructor(component: ReactTreeComponent, children: TreeNode[] = []) {
    this.component = component;
    this.children = children;
  }

  addNode(child: TreeNode): void {
    this.children.push(child);
  }

  addNodes(children: TreeNode[]): void {
    this.children.push(...children);
  }
}

const clientWorkFlow = new TreeNode(ClientGenderComponent);
const coachWorkFlow = new TreeNode(CoachInfoComponent);
const startComponent = new TreeNode(StartComponent);

clientWorkFlow.addNodes([
  new TreeNode(ClientHeightComponent, [new TreeNode(ClientWeightComponent, [new TreeNode(EndComponent)])]),
]);

coachWorkFlow.addNode(new TreeNode(AskForClientWorkflow, [clientWorkFlow, new TreeNode(EndComponent)]));

startComponent.addNodes([clientWorkFlow, coachWorkFlow]);

export const registrationTree = startComponent;
