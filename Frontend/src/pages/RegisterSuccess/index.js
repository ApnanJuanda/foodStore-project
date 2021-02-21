import * as React from 'react';
import {LayoutOne, Card, Text, Button} from 'upkit';
import {Link} from 'react-router-dom'

const RegisterSuccess = () => {
    return (
        <LayoutOne size="small">
            <Card color="grey">
                <div className="text-center">
                    <Text as="h3">
                        Pendaftaran Berhasil
                    </Text>

                    <Text>
                        Silahkan masuk ke Aplikasi
                    </Text>

                    <br />
                    <Link to="/login"> 
                        <Button fitContainer>
                            Login
                        </Button>
                    </Link>

                </div>

            </Card>
        </LayoutOne>
    )
}

export default RegisterSuccess
