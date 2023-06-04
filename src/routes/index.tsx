import { NavigationContainer } from '@react-navigation/native';

// import { Loading } from '../components/Loading';
import { ActivityIndicator } from 'react-native';

import { B2b } from '../contexts/b2b/context';
import { Creation } from '../contexts/CreationContext';
import { Donate } from '../contexts/donate/context';
import { Indication } from '../contexts/indication/context';
import { Invit } from '../contexts/invit/context';
import { LoadData, LoadDataContext } from '../contexts/LoadDataContext';
import { LoadOrders } from '../contexts/LoadOrders';
import { OrderTransaction } from '../contexts/orderTransaction/context';
import { PadrinhoContext } from '../contexts/padrinho/context';
import { Pontos } from '../contexts/pontos/context';
import { PresencaContext } from '../contexts/presenca/context';
import { Transaction } from '../contexts/transaction/context';
import { useAuth } from '../hooks/useAuth';
import { SingIn } from '../pages/LogIn';
import { DrawerApp } from './DrawerApp';

export function Route() {
  const { user, loading } = useAuth();

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <NavigationContainer>
      {user ? (
        <Creation>
          <LoadOrders>
            <LoadData>
              <B2b>
                <Donate>
                  <Indication>
                    <Invit>
                      <OrderTransaction>
                        <Pontos>
                          <Transaction>
                            <PresencaContext>
                              <PadrinhoContext>
                                <DrawerApp />
                              </PadrinhoContext>
                            </PresencaContext>
                          </Transaction>
                        </Pontos>
                      </OrderTransaction>
                    </Invit>
                  </Indication>
                </Donate>
              </B2b>
            </LoadData>
          </LoadOrders>
        </Creation>
      ) : (
        <SingIn />
      )}
    </NavigationContainer>
  );
}
