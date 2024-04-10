import { OnNext, AthleteOrCoachComponent } from '../components/athlete-or-coach.register';
import { RegisterForm } from '../components/register.form';
import { RegisterStateType } from '../pages/register.page';

type ReactTreeComponent = ({
  onNext,
  registerState,
  setRegisterState,
}: {
  onNext: OnNext;
  registerState: RegisterStateType;
  setRegisterState: (state: RegisterStateType) => void;
}) => JSX.Element;

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

const startComponent = new TreeNode(AthleteOrCoachComponent);

startComponent.addNodes([new TreeNode(RegisterForm), new TreeNode(RegisterForm)]);

export const registrationTree = startComponent;
