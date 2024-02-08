import { useEffect, useState } from "react";
import { determineBilling , clubMembers, ClubMember } from "../../lib/billables";
import { Grid, GridColumn as Column } from "@progress/kendo-react-grid";
import { ParentNameCell, CircularAssinment, PaymentCell, NumberOfChiildrenCell, NameOfChildrenCell } from "./custom-cells";

const BillingList = () => {
    const [members, setMembers] = useState<ClubMember[] | null>();
    useEffect(() => {
        const transformedData:ClubMember[] = determineBilling(clubMembers);
        setMembers(transformedData); 
    }, []);

    return (
        <Grid 
            style={{ height: "450px", width: "70%" }} 
            data={members} >
                <Column field="id" title="ID" width="50" />
                <Column field="name" title="Name" width="100px" />
                <Column field="parent" title="Parent" width="100px" cells={{ data: ParentNameCell, }}/>
                <Column field="circular" title="Circlular Assigment" width="150px" cells={{ data: CircularAssinment }} />
                <Column field="shouldBilled" title="Billable" width="100px" cells={{ data: PaymentCell }} />
                <Column field="children" title="Children" width="100px" cells={{ data:  NumberOfChiildrenCell}} />
                <Column field="children" title="Pay For" width="200px" cells={{ data:  NameOfChildrenCell}} />
                
        </Grid>
    )
}
export default BillingList;
