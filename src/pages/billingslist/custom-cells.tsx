/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { checkIcon, cancelIcon } from '@progress/kendo-svg-icons';
import { SvgIcon } from '@progress/kendo-react-common';


export const ParentNameCell = ({ dataItem, ...props } : any) => {
    return (
        <td {...props.tdProps}>
            {dataItem?.parent?.name}
        </td>
    );
};

export const CircularAssinment = ({ dataItem, ...props }: any) => {
    return (
        <td {...props.tdProps}>
            {dataItem?.circular ? <SvgIcon icon={cancelIcon} color='red'/> : ""}
        </td>
    );
};

export const PaymentCell = ({ dataItem, ...props }: any) => {
    return (
        <td {...props.tdProps}>
            {dataItem?.shouldBilled ? <SvgIcon icon={checkIcon} color="green" /> : ""}
        </td>
    );
};

export const NumberOfChiildrenCell = ({ dataItem, ...props }: any) => {
    return (
        <td {...props.tdProps}>
            {dataItem?.children ? dataItem?.children.length : 0}
        </td>
    );
}

export const NameOfChildrenCell = ({ dataItem, ...props }: any) => {
    const children: any = [];
    if(dataItem?.children && dataItem?.children.length){
        dataItem?.children.forEach((child: any) => {
            children.push(`${child.name}`);   
        });
    }
    
    return (
        <td {...props.tdProps}>
            {children.join(", ")}
        </td>
    );
}