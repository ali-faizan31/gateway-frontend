import { FCard, FButton, FInputText, FContainer } from "ferrum-design-system";

export const Components = {
    FButton,
    FCard,
    FContainer, 
    FInputText
};

type ComponentList =
    | 'Button'
    | 'Card'
    | 'Container'
    | 'Divider'
    | 'Input';

export interface IComponent {
    type: ComponentList;
    data: {
        id: string;
        embeddedView?: IComponent;
        items?: Array<IComponent>;
        [key: string]: unknown;
    };
}